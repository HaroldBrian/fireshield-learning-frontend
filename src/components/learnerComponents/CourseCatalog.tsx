import React, { useState } from 'react';
import { useCourses } from '@/hooks/useCourses';
import { useEnrollments } from '@/hooks/useEnrollments';
import { Search, Filter, Clock, Users, Star, BookOpen, Euro } from 'lucide-react';

const CourseCatalog: React.FC = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    level: '',
    priceRange: '',
    page: 1,
    limit: 12
  });

  const { courses, pagination, loading } = useCourses(filters);
  const { enrollInCourse } = useEnrollments();

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleEnroll = async (courseId: string) => {
    await enrollInCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Catalogue de formations</h1>
        <p className="text-gray-600">Découvrez nos formations en sécurité et prévention</p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Recherche */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une formation..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Catégorie */}
          <div>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Toutes les catégories</option>
              <option value="securite-incendie">Sécurité incendie</option>
              <option value="premiers-secours">Premiers secours</option>
              <option value="prevention">Prévention des risques</option>
              <option value="evacuation">Évacuation</option>
              <option value="equipements">Équipements de sécurité</option>
            </select>
          </div>

          {/* Niveau */}
          <div>
            <select
              value={filters.level}
              onChange={(e) => handleFilterChange('level', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les niveaux</option>
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="advanced">Avancé</option>
            </select>
          </div>

          {/* Prix */}
          <div>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les prix</option>
              <option value="0-100">0€ - 100€</option>
              <option value="100-300">100€ - 300€</option>
              <option value="300-500">300€ - 500€</option>
              <option value="500+">500€+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {pagination.total} formation{pagination.total > 1 ? 's' : ''} trouvée{pagination.total > 1 ? 's' : ''}
        </p>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select className="border border-gray-300 rounded px-3 py-1 text-sm">
            <option>Plus récentes</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Mieux notées</option>
          </select>
        </div>
      </div>

      {/* Grille des cours */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-t-xl"></div>
              <div className="bg-white p-4 rounded-b-xl">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onEnroll={() => handleEnroll(course.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handleFilterChange('page', (filters.page - 1).toString())}
            disabled={filters.page === 1}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Précédent
          </button>
          
          <div className="flex space-x-1">
            {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handleFilterChange('page', page.toString())}
                  className={`px-3 py-2 text-sm rounded-lg ${
                    filters.page === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handleFilterChange('page', (filters.page + 1).toString())}
            disabled={filters.page === pagination.totalPages}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

interface CourseCardProps {
  course: any;
  onEnroll: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image du cours */}
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-white" />
        </div>
        <div className="absolute top-4 left-4">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white ${
            course.level === 'beginner' ? 'bg-green-500' :
            course.level === 'intermediate' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}>
            {course.level === 'beginner' ? 'Débutant' :
             course.level === 'intermediate' ? 'Intermédiaire' :
             'Avancé'}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 text-white text-sm">
            <Star className="h-4 w-4 fill-current" />
            <span>4.8</span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Métadonnées */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{course.duration}h de formation</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{course.instructor}</span>
          </div>
        </div>

        {/* Prix et action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Euro className="h-5 w-5 text-green-600 mr-1" />
            <span className="text-xl font-bold text-green-600">{course.price}</span>
          </div>
          <button
            onClick={onEnroll}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;