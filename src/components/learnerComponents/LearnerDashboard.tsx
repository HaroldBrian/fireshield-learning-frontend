import React from 'react';
import { useLearnerProfile, useLearnerEnrollments, useLearnerProgress } from '@/hooks/useLearner';
import { useNotifications, useUpcomingSessions } from '@/hooks/useMessaging';
import { BookOpen, Award, Clock, Bell, Video, TrendingUp } from 'lucide-react';

const LearnerDashboard: React.FC = () => {
  const { learner, loading: profileLoading } = useLearnerProfile();
  const { enrollments, loading: enrollmentsLoading } = useLearnerEnrollments();
  const { progress, loading: progressLoading } = useLearnerProgress();
  const { unreadCount } = useNotifications();
  const { upcomingSessions } = useUpcomingSessions();

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const activeEnrollments = enrollments.filter(e => e.status === 'active');
  const completedCourses = enrollments.filter(e => e.status === 'completed');
  const averageProgress = progress.length > 0 
    ? progress.reduce((sum, p) => sum + p.progress, 0) / progress.length 
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* En-tête de bienvenue */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Bienvenue, {learner?.firstName} {learner?.lastName} !
        </h1>
        <p className="text-blue-100">
          Continuez votre parcours d'apprentissage avec FireShield Learning
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<BookOpen className="h-8 w-8" />}
          title="Cours actifs"
          value={activeEnrollments.length}
          color="bg-blue-500"
          loading={enrollmentsLoading}
        />
        <StatCard
          icon={<Award className="h-8 w-8" />}
          title="Cours terminés"
          value={completedCourses.length}
          color="bg-green-500"
          loading={enrollmentsLoading}
        />
        <StatCard
          icon={<TrendingUp className="h-8 w-8" />}
          title="Progrès moyen"
          value={`${Math.round(averageProgress)}%`}
          color="bg-purple-500"
          loading={progressLoading}
        />
        <StatCard
          icon={<Bell className="h-8 w-8" />}
          title="Notifications"
          value={unreadCount}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cours en cours */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
              Mes cours en cours
            </h2>
            {enrollmentsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : activeEnrollments.length > 0 ? (
              <div className="space-y-4">
                {activeEnrollments.slice(0, 3).map((enrollment) => (
                  <CourseProgressCard key={enrollment.id} enrollment={enrollment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun cours en cours</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Parcourir les cours
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sessions à venir */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Video className="h-5 w-5 mr-2 text-purple-600" />
              Sessions à venir
            </h2>
            {upcomingSessions.length > 0 ? (
              <div className="space-y-3">
                {upcomingSessions.slice(0, 3).map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-3">
                    <h3 className="font-medium text-sm">{session.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(session.scheduledAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <button className="mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      Rejoindre
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Aucune session programmée</p>
            )}
          </div>

          {/* Activité récente */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-green-600" />
              Activité récente
            </h2>
            <div className="space-y-3">
              {progress.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Leçon terminée</span>
                  <span className="text-green-600 font-medium">+{item.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color, loading }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          {loading ? (
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-2"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          )}
        </div>
        <div className={`${color} p-3 rounded-lg text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface CourseProgressCardProps {
  enrollment: any;
}

const CourseProgressCard: React.FC<CourseProgressCardProps> = ({ enrollment }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900">Cours de sécurité incendie</h3>
        <span className="text-sm text-gray-500">{enrollment.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${enrollment.progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Dernière activité: il y a 2 jours</span>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          Continuer
        </button>
      </div>
    </div>
  );
};

export default LearnerDashboard;