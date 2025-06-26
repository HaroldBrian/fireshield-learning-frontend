import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { CourseFilters as FilterType } from '@/services/courseService';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface CourseFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  categories: string[];
  onClearFilters: () => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  filters,
  onFiltersChange,
  categories,
  onClearFilters,
}) => {
  const handleFilterChange = (key: keyof FilterType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const levels = [
    { value: 'beginner', label: 'Débutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'advanced', label: 'Avancé' },
  ];

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== 0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-secondary-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filtres
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            icon={<X className="w-4 h-4" />}
          >
            Effacer
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Recherche */}
        <div>
          <Input
            type="text"
            placeholder="Rechercher..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            icon={<Search className="w-4 h-4" />}
            fullWidth
          />
        </div>

        {/* Catégorie */}
        <div>
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Niveau */}
        <div>
          <select
            value={filters.level || ''}
            onChange={(e) => handleFilterChange('level', e.target.value)}
            className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">Tous les niveaux</option>
            {levels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Prix */}
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Prix min"
            value={filters.priceMin || ''}
            onChange={(e) => handleFilterChange('priceMin', e.target.value ? parseInt(e.target.value) : undefined)}
            fullWidth
          />
          <Input
            type="number"
            placeholder="Prix max"
            value={filters.priceMax || ''}
            onChange={(e) => handleFilterChange('priceMax', e.target.value ? parseInt(e.target.value) : undefined)}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;