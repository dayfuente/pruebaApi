<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <p>olaaaaaaaaaaaaaaaaaa</p>
      <p><strong>ID:</strong> {{ id }}</p>
      <p><strong>Nombre:</strong> {{ user.firstName }}</p>
      <p><strong>Apellidos:</strong> {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <input  v-model="user.email"
          id="inputEmail"
          class="form-control form-control-lg"
          type="text"
          placeholder="Email"
          aria-label="Email">
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useUsersStore } from './../stores/users';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id);
const userStore = useUsersStore();
const loading = computed(() => userStore.loading);
const error = computed(() => userStore.error);
const user = computed(() => userStore.user);

onMounted(async () => {
  await userStore.fetchUserById(id.value);
});
</script>

<style scoped></style>
