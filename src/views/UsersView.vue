<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p><strong>ID:</strong> {{ id }}</p>
      <!-- <p><strong>Nombre:</strong> {{ user.firstName }}</p>
      <p><strong>Apellidos:</strong> {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p> -->
      <div class="row">
        <div class="col-10">
          <input v-model="user.email"
          id="inputEmail"
          class="form-control form-control-lg"
          type="text"
          placeholder="Email"
          aria-label="Email">
        </div>
        <div class="col-2">
          <button @click="updateUser" class="btn btn-info mt-1">Actualizar</button>
          <button @click="deleteUser" class="btn btn-danger mt-2">Eliminar</button>
        </div>
      </div>
     
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUsersStore } from './../stores/users';
import { useRoute, useRouter  } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id);
const userStore = useUsersStore();
const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);
const user = computed(() => userStore.user);

const email = ref('');
onMounted(async () => {
  await userStore.fetchUserById(id.value);

  email.value = user.value.email;
});

const updateUser = async () => {
  // Aquí actualizamos el usuario llamando al método del store
  await userStore.updateUserById(id.value, { email: user.value.email });
};

const deleteUser = async () => {
  await userStore.deleteUserById(id.value);
  router.push({ name: 'Home' }); 
};
</script>

<style scoped></style>
