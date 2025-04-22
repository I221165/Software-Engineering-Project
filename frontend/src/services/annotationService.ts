interface Annotation {
  id: string;
  content: string;
  createdAt: string;
}

// Mock data for testing
const mockAnnotations: Record<string, Annotation[]> = {
  '1': [
    {
      id: '1',
      content: 'Consider increasing retirement contributions',
      createdAt: '2024-03-20T10:00:00Z'
    },
    {
      id: '2',
      content: 'Review investment portfolio allocation',
      createdAt: '2024-03-19T15:30:00Z'
    }
  ]
};

const annotationService = {
  async list(clientId: string): Promise<Annotation[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockAnnotations[clientId] || [];
  },

  async add(clientId: string, content: string): Promise<Annotation> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString()
    };

    if (!mockAnnotations[clientId]) {
      mockAnnotations[clientId] = [];
    }
    mockAnnotations[clientId].unshift(newAnnotation);

    return newAnnotation;
  }
};

export default annotationService; 