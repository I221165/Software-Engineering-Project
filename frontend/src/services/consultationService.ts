// Mock data for testing
const mockSlots = [
  '2024-03-25 09:00',
  '2024-03-25 10:00',
  '2024-03-25 11:00',
  '2024-03-25 14:00',
  '2024-03-25 15:00',
  '2024-03-25 16:00'
];

const consultationService = {
  async getAvailableSlots(): Promise<string[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockSlots;
  },

  async schedule(clientId: string, slot: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Scheduled consultation for client ${clientId} at ${slot}`);
  }
};

export default consultationService; 