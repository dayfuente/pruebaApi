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
            <button @click="goToUserDetails(user.id)" class="btn btn-info">Info</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      No hay usuarios para mostrar.
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useUsersStore } from './../stores/users';
import { useRouter } from 'vue-router';

const userStore = useUsersStore();
const router = useRouter();

const users = computed(() => userStore.users);
const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);

onMounted(() => {
  userStore.fetchUsers();
});

const goToUserDetails = (id) => {
  router.push({ name: 'Users', params: { id } });
};
</script>

<style scoped>
</style>
