import React, { useState, useEffect } from 'react';
import { useLiveSessions } from '@/hooks/useLiveSessions';
import { Video, Users, Calendar, Clock, Play, ExternalLink } from 'lucide-react';

interface LiveSessionViewerProps {
  courseId?: string;
}

const LiveSessionViewer: React.FC<LiveSessionViewerProps> = ({ courseId }) => {
  const { sessions, loading, joinSession, leaveSession } = useLiveSessions(courseId);
  const [activeSession, setActiveSession] = useState<any>(null);

  const handleJoinSession = async (sessionId: string) => {
    const meetingUrl = await joinSession(sessionId);
    if (meetingUrl) {
      // Ouvrir la session dans une nouvelle fenêtre ou intégrer Jitsi
      window.open(meetingUrl, '_blank', 'width=1200,height=800');
    }
  };

  const getSessionStatus = (session: any) => {
    const now = new Date();
    const scheduledTime = new Date(session.scheduledAt);
    const endTime = new Date(scheduledTime.getTime() + session.duration * 60000);

    if (now < scheduledTime) return 'scheduled';
    if (now >= scheduledTime && now <= endTime) return 'live';
    return 'ended';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Programmée';
      case 'live':
        return 'En direct';
      case 'ended':
        return 'Terminée';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sessions en direct</h1>
        <p className="text-gray-600">Participez aux cours en temps réel avec vos formateurs</p>
      </div>

      {/* Sessions en cours */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sessions en cours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions
            .filter(session => getSessionStatus(session) === 'live')
            .map((session) => (
              <LiveSessionCard
                key={session.id}
                session={session}
                status="live"
                onJoin={() => handleJoinSession(session.id)}
              />
            ))}
        </div>
        {sessions.filter(session => getSessionStatus(session) === 'live').length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Video className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Aucune session en cours actuellement</p>
          </div>
        )}
      </div>

      {/* Sessions à venir */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sessions à venir</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions
            .filter(session => getSessionStatus(session) === 'scheduled')
            .map((session) => (
              <LiveSessionCard
                key={session.id}
                session={session}
                status="scheduled"
                onJoin={() => handleJoinSession(session.id)}
              />
            ))}
        </div>
      </div>

      {/* Sessions passées */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sessions passées</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions
            .filter(session => getSessionStatus(session) === 'ended')
            .map((session) => (
              <LiveSessionCard
                key={session.id}
                session={session}
                status="ended"
                onJoin={() => handleJoinSession(session.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

interface LiveSessionCardProps {
  session: any;
  status: string;
  onJoin: () => void;
}

const LiveSessionCard: React.FC<LiveSessionCardProps> = ({ session, status, onJoin }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Programmée';
      case 'live':
        return 'En direct';
      case 'ended':
        return 'Terminée';
      default:
        return status;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const { date, time } = formatDateTime(session.scheduledAt);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* En-tête avec statut */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {session.title}
          </h3>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
            {getStatusText(status)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {session.description}
        </p>

        {/* Informations de la session */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{time} ({session.duration} min)</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{session.participants?.length || 0} participant(s)</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6">
        {status === 'live' && (
          <button
            onClick={onJoin}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Rejoindre maintenant</span>
          </button>
        )}

        {status === 'scheduled' && (
          <div className="space-y-3">
            <button
              onClick={onJoin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Programmer un rappel
            </button>
            <div className="text-center text-sm text-gray-500">
              Commence dans {/* Calculer le temps restant */}
            </div>
          </div>
        )}

        {status === 'ended' && (
          <div className="space-y-3">
            {session.recordingUrl ? (
              <button
                onClick={() => window.open(session.recordingUrl, '_blank')}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Voir l'enregistrement</span>
              </button>
            ) : (
              <div className="w-full bg-gray-100 text-gray-500 py-3 rounded-lg text-center font-medium">
                Enregistrement non disponible
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSessionViewer;