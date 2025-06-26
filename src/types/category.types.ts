export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  parent_id?: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  // Relations
  parent?: Category;
  children?: Category[];
  courses_count?: number;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  parent_id?: number;
  is_active?: boolean;
  sort_order?: number;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
  parent_id?: number;
  is_active?: boolean;
  sort_order?: number;
}

export interface CategoryFilters {
  search?: string;
  parent_id?: number;
  is_active?: boolean;
  page?: number;
  limit?: number;
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}