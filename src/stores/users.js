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
    },
    async updateUserById(id, updatedUser) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`https://dummyjson.com/users/${id}`, updatedUser);
        this.user = response.data;
      } catch (error) {
        this.error = 'Failed to update user';
        console.error('Error updating user:', error);
      } finally {
        this.loading = false;
      }
    },
    async deleteUserById(id) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`https://dummyjson.com/users/${id}`);
        this.users = this.users.filter(user => user.id !== id); // Remove user from local state
      } catch (error) {
        this.error = 'Failed to delete user';
        console.error('Error deleting user:', error);
      } finally {
        this.loading = false;
      }
    },
    async addUser(newUser) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post('https://dummyjson.com/users/add', newUser);
        // Actualizar la lista de usuarios con el nuevo usuario agregado
        this.users.push(response.data);
      } catch (error) {
        this.error = 'Failed to add user';
        console.error('Error adding user:', error);
      } finally {
        this.loading = false;
      }
    }
  },

  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id);
    }
  }
});
