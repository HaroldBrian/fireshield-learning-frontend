import React from 'react';
import { useCategories } from '@/hooks/useCategories';
import { 
  FolderOpen, 
  Eye, 
  EyeOff, 
  BookOpen,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const CategoryStats: React.FC = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.is_active).length;
  const inactiveCategories = totalCategories - activeCategories;
  const totalCourses = categories.reduce((sum, c) => sum + (c.courses_count || 0), 0);

  const stats = [
    {
      title: 'Total des catégories',
      value: totalCategories,
      icon: FolderOpen,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Catégories actives',
      value: activeCategories,
      icon: Eye,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Catégories inactives',
      value: inactiveCategories,
      icon: EyeOff,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Total des cours',
      value: totalCourses,
      icon: BookOpen,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryStats;