const reportService = {
  async generate(clientId: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return a mock PDF URL
    return `https://example.com/reports/${clientId}/financial-advice-${new Date().toISOString()}.pdf`;
  }
};

export default reportService; 