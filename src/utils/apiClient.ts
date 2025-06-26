import api from '@/lib/api';

class ApiClient {
  async getAll<T>(endpoint: string): Promise<T> {
    const response = await api.get(endpoint);
    return response.data.data || response.data;
  }

  async getById<T>(endpoint: string, id: string): Promise<T> {
    const response = await api.get(`${endpoint}/${id}`);
    return response.data.data || response.data;
  }

  async create<T>(endpoint: string, data: any): Promise<T> {
    const response = await api.post(endpoint, data);
    return response.data.data || response.data;
  }

  async update<T>(endpoint: string, data: any): Promise<T> {
    const response = await api.put(endpoint, data);
    return response.data.data || response.data;
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    const response = await api.patch(endpoint, data);
    return response.data.data || response.data;
  }

  async deleteById(endpoint: string): Promise<void> {
    await api.delete(endpoint);
  }
}

export default new ApiClient();