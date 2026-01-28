import api from './api';

export const simulationService = {
  createSimulation: async (scenarios) => {
    const response = await api.post('/api/predictions/simulate', {
      scenarios,
    });
    return response.data;
  },

  getSimulation: async (simulationId) => {
    const response = await api.get(`/api/predictions/${simulationId}`);
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/api/predictions/history');
    return response.data;
  },

  submitFeedback: async (simulationId, actualOutcome) => {
    const response = await api.post('/api/predictions/feedback', {
      simulation_id: simulationId,
      actual_outcome: actualOutcome,
    });
    return response.data;
  },
};
