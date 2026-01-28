import api from './api';

export const userService = {
  getProfile: async () => {
    const response = await api.get('/api/users/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/api/users/profile', data);
    return response.data;
  },
};
