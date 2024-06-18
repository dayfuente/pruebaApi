import { defineStore } from 'pinia';
import axios from 'axios';

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    user: {},
    loading: false,
    error: null
  }),

  actions: {
    async fetchUsers() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get('https://dummyjson.com/users');
          this.users = response.data.users;
        } catch (error) {
          this.error = 'Failed to fetch users';
          console.error('Error fetching users:', error);
        } finally {
          this.loading = false;
        }
      },
      async fetchUserById(id) {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get(`https://dummyjson.com/users/${id}`);
          this.user = response.data;
        } catch (error) {
          this.error = 'Failed to fetch user';
        } finally {
          this.loading = false;
        }
      }
  },

  getters: {
    // Definimos un getter para retornar los usuarios
    // getUsers: (state) => state.users,

    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id);
    }
  }
});