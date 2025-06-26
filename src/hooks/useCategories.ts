import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '@/services/categoryService';
import { Category, CreateCategoryData, UpdateCategoryData, CategoryFilters } from '@/types/category.types';
import { toast } from 'sonner';

export const useCategories = (filters?: CategoryFilters) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getAllCategories(filters);
      setCategories(data.categories);
      setPagination({
        total: data.total,
        page: data.page,
        totalPages: data.total_pages
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des catégories';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = async (categoryData: CreateCategoryData): Promise<boolean> => {
    try {
      const newCategory = await categoryService.createCategory(categoryData);
      setCategories(prev => [...prev, newCategory]);
      toast.success('Catégorie créée avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création de la catégorie';
      toast.error(errorMessage);
      return false;
    }
  };

  const updateCategory = async (id: string, categoryData: UpdateCategoryData): Promise<boolean> => {
    try {
      const updatedCategory = await categoryService.updateCategory(id, categoryData);
      setCategories(prev => prev.map(category => category.id.toString() === id ? updatedCategory : category));
      toast.success('Catégorie mise à jour avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour de la catégorie';
      toast.error(errorMessage);
      return false;
    }
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    try {
      await categoryService.deleteCategory(id);
      setCategories(prev => prev.filter(category => category.id.toString() !== id));
      toast.success('Catégorie supprimée avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression de la catégorie';
      toast.error(errorMessage);
      return false;
    }
  };

  const toggleStatus = async (id: string): Promise<boolean> => {
    try {
      const updatedCategory = await categoryService.toggleCategoryStatus(id);
      setCategories(prev => prev.map(category => category.id.toString() === id ? updatedCategory : category));
      toast.success('Statut de la catégorie modifié avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la modification du statut';
      toast.error(errorMessage);
      return false;
    }
  };

  return {
    categories,
    pagination,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleStatus
  };
};

export const useCategoryTree = () => {
  const [categoryTree, setCategoryTree] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryTree = useCallback(async () => {
    try {
      setLoading(true);
      const data = await categoryService.getCategoryTree();
      setCategoryTree(data);
    } catch (err) {
      toast.error('Erreur lors du chargement de l\'arbre des catégories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategoryTree();
  }, [fetchCategoryTree]);

  return {
    categoryTree,
    loading,
    refetch: fetchCategoryTree
  };
};

export const useParentCategories = () => {
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchParentCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await categoryService.getParentCategories();
      setParentCategories(data);
    } catch (err) {
      toast.error('Erreur lors du chargement des catégories parentes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchParentCategories();
  }, [fetchParentCategories]);

  return {
    parentCategories,
    loading,
    refetch: fetchParentCategories
  };
};