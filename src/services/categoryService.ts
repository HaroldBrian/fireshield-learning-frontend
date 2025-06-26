import { apiClient } from "@/utils";
import type {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
  CategoryFilters,
  CategoriesResponse,
} from "@/types/category.types";

class CategoryService {
  private readonly endpoint = "api/v1/categories";

  async getAllCategories(filters?: CategoryFilters): Promise<CategoriesResponse> {
    const queryParams = filters
      ? new URLSearchParams(filters as any).toString()
      : "";
    const url = queryParams ? `${this.endpoint}?${queryParams}` : this.endpoint;
    return await apiClient.getAll(url);
  }

  async getCategoryById(id: string): Promise<Category> {
    return await apiClient.getById(this.endpoint, id);
  }

  async createCategory(categoryData: CreateCategoryData): Promise<Category> {
    return await apiClient.create(this.endpoint, categoryData);
  }

  async updateCategory(
    id: string,
    categoryData: UpdateCategoryData
  ): Promise<Category> {
    return await apiClient.update(`${this.endpoint}/${id}`, categoryData);
  }

  async deleteCategory(id: string): Promise<void> {
    return await apiClient.deleteById(`${this.endpoint}/${id}`);
  }

  async getParentCategories(): Promise<Category[]> {
    return await apiClient.getAll(`${this.endpoint}/parents`);
  }

  async getCategoryTree(): Promise<Category[]> {
    return await apiClient.getAll(`${this.endpoint}/tree`);
  }

  async reorderCategories(categoryIds: string[]): Promise<void> {
    return await apiClient.create(`${this.endpoint}/reorder`, { categoryIds });
  }

  async toggleCategoryStatus(id: string): Promise<Category> {
    return await apiClient.patch(`${this.endpoint}/${id}/toggle-status`, {});
  }

  async getCategoriesWithCourseCount(): Promise<Category[]> {
    return await apiClient.getAll(`${this.endpoint}/with-course-count`);
  }
}

export const categoryService = new CategoryService();