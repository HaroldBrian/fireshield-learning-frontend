import { useState, useEffect, useCallback } from 'react';
import { courseService, Course, CreateCourseData, UpdateCourseData, CourseFilters } from '@/services/courseService';
import toast from 'react-hot-toast';

export const useCourses = (filters?: CourseFilters) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseService.getAllCourses(filters);
      setCourses(data.courses);
      setPagination({
        total: data.total,
        page: data.page,
        totalPages: data.totalPages
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des cours';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const createCourse = async (courseData: CreateCourseData): Promise<boolean> => {
    try {
      const newCourse = await courseService.createCourse(courseData);
      setCourses(prev => [...prev, newCourse]);
      toast.success('Cours créé avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création du cours';
      toast.error(errorMessage);
      return false;
    }
  };

  const updateCourse = async (id: string, courseData: UpdateCourseData): Promise<boolean> => {
    try {
      const updatedCourse = await courseService.updateCourse(id, courseData);
      setCourses(prev => prev.map(course => course.id === id ? updatedCourse : course));
      toast.success('Cours mis à jour avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour du cours';
      toast.error(errorMessage);
      return false;
    }
  };

  const publishCourse = async (id: string): Promise<boolean> => {
    try {
      const updatedCourse = await courseService.publishCourse(id);
      setCourses(prev => prev.map(course => course.id === id ? updatedCourse : course));
      toast.success('Cours publié avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la publication du cours';
      toast.error(errorMessage);
      return false;
    }
  };

  const unpublishCourse = async (id: string): Promise<boolean> => {
    try {
      const updatedCourse = await courseService.unpublishCourse(id);
      setCourses(prev => prev.map(course => course.id === id ? updatedCourse : course));
      toast.success('Cours dépublié avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la dépublication du cours';
      toast.error(errorMessage);
      return false;
    }
  };

  const deleteCourse = async (id: string): Promise<boolean> => {
    try {
      await courseService.deleteCourse(id);
      setCourses(prev => prev.filter(course => course.id !== id));
      toast.success('Cours supprimé avec succès');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression du cours';
      toast.error(errorMessage);
      return false;
    }
  };

  return {
    courses,
    pagination,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    publishCourse,
    unpublishCourse,
    deleteCourse
  };
};

export const useCourse = (id: string) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await courseService.getCourseById(id);
      setCourse(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement du cours';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  return {
    course,
    loading,
    error,
    refetch: fetchCourse
  };
};