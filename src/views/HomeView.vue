<template>
  <div>
    <h1>User List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>

    <table v-if="users.length > 0" class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>
            <button @click="goToUserDetails(user.id)" class="btn btn-info mr-2">Info</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      No hay usuarios para mostrar.
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="handleSubmit">
        <label>Nombre:</label>
        <input v-model="newUser.firstName" type="text" required>
        <label>Apellidos:</label>
        <input v-model="newUser.lastName" type="text" required>
        <label>Edad:</label>
        <input v-model.number="newUser.age" type="number" required>
        <!-- Otros campos del usuario -->

        <button type="submit">Guardar</button>
      </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUsersStore } from './../stores/users';
import { useRouter } from 'vue-router';

const userStore = useUsersStore();
const router = useRouter();

const users = computed(() => userStore.users);
const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);
const newUser = ref({
  firstName: '',
  lastName: '',
  age: 0
});

onMounted(() => {
  userStore.fetchUsers();
});

const goToUserDetails = (id) => {
  router.push({ name: 'Users', params: { id } });
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;
  try {
    await userStore.addUser(newUser.value);
    // Limpiar formulario o realizar otras acciones después de agregar el usuario
    newUser.value = {
      firstName: '',
      lastName: '',
      age: 0
    };
  } catch (err) {
    error.value = 'Error al agregar usuario';
    console.error('Error adding user:', err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
</style>
