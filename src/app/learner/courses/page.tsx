/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Grid, List, Filter, Search } from "lucide-react";
import { courseService } from "@/services/courseService";
import type { Course, CourseFilters } from "@/types/course.types";
import Link from "next/link";
import Image from "next/image";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<CourseFilters>({
    page: 1,
    limit: 12,
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, [filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseService.getAllCourses(filters);
      setCourses(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Erreur lors du chargement des cours:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await courseService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error);
    }
  };

  const handleFiltersChange = (newFilters: Partial<CourseFilters>) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="aspect-video relative">
        {course.thumbnail_url ? (
          <Image
            src={course.thumbnail_url}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-white text-4xl">📚</span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-primary-500 text-white text-xs font-medium rounded">
            {course.level === "beginner"
              ? "Débutant"
              : course.level === "intermediate"
                ? "Intermédiaire"
                : "Avancé"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-primary-600 font-medium uppercase tracking-wide">
            {course.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary-600">
            {course.price === 0 ? "Gratuit" : `${course.price}€`}
          </div>
          <Link href={`/courses/${course.id}`} className="btn-primary text-sm">
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
            >
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Catalogue de formations
          </h1>
          <p className="text-gray-600 mt-2">
            Découvrez nos formations et développez vos compétences
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${viewMode === "list" ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={filters.search || ""}
              onChange={(e) => handleFiltersChange({ search: e.target.value })}
              className="input-field pl-10"
            />
          </div>

          <select
            value={filters.category || ""}
            onChange={(e) => handleFiltersChange({ category: e.target.value })}
            className="input-field"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={filters.level || ""}
            onChange={(e) =>
              handleFiltersChange({
                level:
                  e.target.value === ""
                    ? undefined
                    : (e.target.value as Course["level"]),
              })
            }
            className="input-field"
          >
            <option value="">Tous les niveaux</option>
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
          </select>

          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Prix min"
              value={filters.price_min || ""}
              onChange={(e) =>
                handleFiltersChange({
                  price_min: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                })
              }
              className="input-field"
            />
            <input
              type="number"
              placeholder="Prix max"
              value={filters.price_max || ""}
              onChange={(e) =>
                handleFiltersChange({
                  price_max: e.target.value
                    ? parseInt(e.target.value)
                    : undefined,
                })
              }
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {courses.length} formation(s) trouvée(s)
        </p>
      </div>

      {/* Liste des cours */}
      {courses.length > 0 ? (
        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📚</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune formation trouvée
          </h3>
          <p className="text-gray-600 mb-4">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handleFiltersChange({ page })}
                className={`px-4 py-2 rounded-lg ${
                  filters.page === page
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
