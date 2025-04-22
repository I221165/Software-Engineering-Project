interface Client {
  id: string;
  name: string;
  email: string;
  status: string;
  lastContact: string;
}

// Mock data for testing
const mockClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    lastContact: '2024-03-20'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'pending',
    lastContact: '2024-03-19'
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    status: 'inactive',
    lastContact: '2024-03-15'
  }
];

const clientService = {
  async getSummaries(): Promise<Client[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockClients;
  },

  async getAll(): Promise<Client[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockClients;
  }
};

export default clientService; 