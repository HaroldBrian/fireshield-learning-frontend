import { apiClient } from '@/utils';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: string;
}

class UserService {
  private readonly endpoint = '/users';

  async getAllUsers(): Promise<User[]> {
    return await apiClient.getAll(this.endpoint);
  }

  async getUserById(id: string): Promise<User> {
    return await apiClient.getById(this.endpoint, id);
  }

  async createUser(userData: CreateUserData): Promise<User> {
    return await apiClient.create(this.endpoint, userData);
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    return await apiClient.update(`${this.endpoint}/${id}`, userData);
  }

  async patchUser(id: string, userData: Partial<UpdateUserData>): Promise<User> {
    return await apiClient.patch(`${this.endpoint}/${id}`, userData);
  }

  async deleteUser(id: string): Promise<void> {
    return await apiClient.deleteById(`${this.endpoint}/${id}`);
  }

  async getUserProfile(): Promise<User> {
    return await apiClient.getAll(`${this.endpoint}/profile`);
  }
}

export const userService = new UserService();