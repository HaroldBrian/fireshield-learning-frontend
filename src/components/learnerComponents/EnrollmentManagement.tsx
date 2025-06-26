import React, { useState } from 'react';
import { useEnrollments, usePayments } from '@/hooks/useEnrollments';
import { BookOpen, Clock, CheckCircle, XCircle, CreditCard, Download, AlertCircle } from 'lucide-react';

const EnrollmentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const { enrollments, loading, cancelEnrollment } = useEnrollments();
  const { downloadInvoice } = usePayments();

  const filteredEnrollments = enrollments.filter(enrollment => {
    if (activeTab === 'all') return true;
    return enrollment.status === activeTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'accepted':
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'rejected':
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'accepted':
        return 'Accepté';
      case 'active':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'rejected':
        return 'Rejeté';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes inscriptions</h1>
        <p className="text-gray-600">Gérez vos inscriptions et suivez vos paiements</p>
      </div>

      {/* Onglets de filtrage */}
      <div className="bg-white rounded-xl shadow-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'all', label: 'Toutes', count: enrollments.length },
              { key: 'pending', label: 'En attente', count: enrollments.filter(e => e.status === 'pending').length },
              { key: 'active', label: 'Actives', count: enrollments.filter(e => e.status === 'active').length },
              { key: 'completed', label: 'Terminées', count: enrollments.filter(e => e.status === 'completed').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Liste des inscriptions */}
      <div className="space-y-6">
        {filteredEnrollments.length > 0 ? (
          filteredEnrollments.map((enrollment) => (
            <EnrollmentCard
              key={enrollment.id}
              enrollment={enrollment}
              onCancel={cancelEnrollment}
              onDownloadInvoice={downloadInvoice}
              getStatusIcon={getStatusIcon}
              getStatusText={getStatusText}
              getPaymentStatusColor={getPaymentStatusColor}
            />
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune inscription trouvée
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'all' 
                ? "Vous n'avez pas encore d'inscriptions."
                : `Aucune inscription ${getStatusText(activeTab)} trouvée.`
              }
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Parcourir les formations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface EnrollmentCardProps {
  enrollment: any;
  onCancel: (id: string, reason?: string) => Promise<boolean>;
  onDownloadInvoice: (invoiceId: string) => Promise<boolean>;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusText: (status: string) => string;
  getPaymentStatusColor: (status: string) => string;
}

const EnrollmentCard: React.FC<EnrollmentCardProps> = ({
  enrollment,
  onCancel,
  onDownloadInvoice,
  getStatusIcon,
  getStatusText,
  getPaymentStatusColor
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const handleCancel = async () => {
    const success = await onCancel(enrollment.id, cancelReason);
    if (success) {
      setShowCancelModal(false);
      setCancelReason('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Formation en sécurité incendie
            </h3>
            <p className="text-gray-600 text-sm mb-2">
              Inscrit le {new Date(enrollment.enrolledAt).toLocaleDateString('fr-FR')}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(enrollment.status)}
                <span className="text-sm font-medium">
                  {getStatusText(enrollment.status)}
                </span>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                getPaymentStatusColor(enrollment.paymentStatus)
              }`}>
                Paiement: {enrollment.paymentStatus === 'paid' ? 'Payé' : 
                          enrollment.paymentStatus === 'pending' ? 'En attente' : 
                          enrollment.paymentStatus === 'failed' ? 'Échoué' : 'Non payé'}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {enrollment.progress}%
          </div>
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${enrollment.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Informations détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Date de début</h4>
          <p className="text-gray-900">
            {enrollment.startDate 
              ? new Date(enrollment.startDate).toLocaleDateString('fr-FR')
              : 'Non définie'
            }
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Date de fin</h4>
          <p className="text-gray-900">
            {enrollment.completedAt 
              ? new Date(enrollment.completedAt).toLocaleDateString('fr-FR')
              : 'En cours'
            }
          </p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Note finale</h4>
          <p className="text-gray-900">
            {enrollment.grade ? `${enrollment.grade}/20` : 'Non évaluée'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          {enrollment.status === 'active' && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Continuer le cours
            </button>
          )}
          {enrollment.certificate && (
            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Certificat</span>
            </button>
          )}
          {enrollment.paymentStatus === 'paid' && (
            <button 
              onClick={() => onDownloadInvoice(enrollment.paymentId)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <Download className="h-4 w-4" />
              <span>Facture</span>
            </button>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {enrollment.paymentStatus === 'pending' && (
            <button className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              <CreditCard className="h-4 w-4" />
              <span>Payer</span>
            </button>
          )}
          {(enrollment.status === 'pending' || enrollment.status === 'active') && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="text-red-600 hover:text-red-800 px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              Annuler
            </button>
          )}
        </div>
      </div>

      {/* Modal d'annulation */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Annuler l'inscription</h3>
            <p className="text-gray-600 mb-4">
              Êtes-vous sûr de vouloir annuler cette inscription ? Cette action est irréversible.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raison de l'annulation (optionnel)
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Expliquez pourquoi vous annulez cette inscription..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirmer l'annulation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentManagement;