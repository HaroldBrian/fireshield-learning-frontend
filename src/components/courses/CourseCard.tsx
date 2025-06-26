import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Star, Heart, BookOpen } from 'lucide-react';
import { Course } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface CourseCardProps {
  course: Course;
  onAddToFavorites?: (courseId: number) => void;
  showFavoriteButton?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onAddToFavorites, 
  showFavoriteButton = true 
}) => {
  const formatDuration = (duration: string) => {
    // Si c'est déjà formaté (ex: "4 semaines"), on retourne tel quel
    if (isNaN(Number(duration))) {
      return duration;
    }
    
    // Sinon on assume que c'est en minutes
    const minutes = parseInt(duration);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes > 0 ? remainingMinutes + 'm' : ''}`;
    }
    return `${remainingMinutes}m`;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-success-100 text-success-800';
      case 'intermediate':
        return 'bg-warning-100 text-warning-800';
      case 'advanced':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-secondary-100 text-secondary-800';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Débutant';
      case 'intermediate':
        return 'Intermédiaire';
      case 'advanced':
        return 'Avancé';
      default:
        return level;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300" padding="none">
      <div className="relative">
        <div className="aspect-video relative overflow-hidden">
          {course.thumbnail_url ? (
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          )}
        </div>
        
        {showFavoriteButton && onAddToFavorites && (
          <button
            onClick={() => onAddToFavorites(course.id)}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200"
          >
            <Heart className="w-4 h-4 text-secondary-600 hover:text-primary-500" />
          </button>
        )}

        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
            {getLevelLabel(course.level)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-primary-600 font-medium uppercase tracking-wide">
            {course.category || 'Formation'}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-secondary-600 mb-4 line-clamp-3">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {formatDuration(course.duration)}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {course.enrollments?.length || 0}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-warning-500" />
            4.5
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary-600">
            {course.price === 0 ? 'Gratuit' : `${course.price}€`}
          </div>
          <Link href={`/courses/${course.id}`}>
            <Button size="sm">
              Voir détails
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;