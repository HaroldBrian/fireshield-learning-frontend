import React, { useState, useEffect } from 'react';
import { useAssessments, useAssessmentAttempt } from '@/hooks/useAssessments';
import { Clock, CheckCircle, AlertCircle, Award } from 'lucide-react';

interface AssessmentTakingProps {
  courseId: string;
}

const AssessmentTaking: React.FC<AssessmentTakingProps> = ({ courseId }) => {
  const { assessments, loading } = useAssessments(courseId);
  const { currentAttempt, startAssessment, submitAssessment, getAttemptResults } = useAssessmentAttempt();
  
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<any>(null);

  // Timer pour l'évaluation
  useEffect(() => {
    if (currentAttempt && selectedAssessment?.timeLimit && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitAssessment();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentAttempt, timeLeft]);

  const handleStartAssessment = async (assessment: any) => {
    const success = await startAssessment(assessment.id);
    if (success) {
      setSelectedAssessment(assessment);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setTimeLeft(assessment.timeLimit ? assessment.timeLimit * 60 : 0);
    }
  };

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitAssessment = async () => {
    if (!selectedAssessment || !currentAttempt) return;

    setIsSubmitting(true);
    
    const formattedAnswers = selectedAssessment.questions.map((question: any) => ({
      questionId: question.id,
      answer: answers[question.id] || '',
      isCorrect: false, // Sera calculé côté serveur
      points: 0 // Sera calculé côté serveur
    }));

    const timeSpent = selectedAssessment.timeLimit 
      ? (selectedAssessment.timeLimit * 60) - timeLeft
      : 0;

    const result = await submitAssessment(selectedAssessment.id, formattedAnswers, timeSpent);
    
    if (result) {
      const attemptResults = await getAttemptResults(result.id);
      setResults(attemptResults);
    }
    
    setIsSubmitting(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Affichage des résultats
  if (results) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            results.attempt.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {results.attempt.passed ? (
              <Award className="h-10 w-10 text-green-600" />
            ) : (
              <AlertCircle className="h-10 w-10 text-red-600" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {results.attempt.passed ? 'Félicitations !' : 'Résultat insuffisant'}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {results.attempt.score}%
              </div>
              <div className="text-sm text-gray-600">Score obtenu</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {selectedAssessment.passingScore}%
              </div>
              <div className="text-sm text-gray-600">Score requis</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {Math.floor(results.attempt.timeSpent / 60)}min
              </div>
              <div className="text-sm text-gray-600">Temps utilisé</div>
            </div>
          </div>

          {/* Détail des réponses */}
          <div className="text-left">
            <h2 className="text-xl font-semibold mb-4">Détail des réponses</h2>
            <div className="space-y-4">
              {selectedAssessment.questions.map((question: any, index: number) => {
                const userAnswer = results.attempt.answers.find((a: any) => a.questionId === question.id);
                const correctAnswer = results.correctAnswers.find((a: any) => a.questionId === question.id);
                
                return (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium text-gray-900">
                        Question {index + 1}: {question.question}
                      </h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        userAnswer?.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {userAnswer?.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Votre réponse: </span>
                        <span className={userAnswer?.isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {userAnswer?.answer}
                        </span>
                      </div>
                      {!userAnswer?.isCorrect && (
                        <div>
                          <span className="font-medium text-gray-700">Réponse correcte: </span>
                          <span className="text-green-600">{correctAnswer?.answer}</span>
                        </div>
                      )}
                      {question.explanation && (
                        <div className="bg-blue-50 p-3 rounded mt-2">
                          <span className="font-medium text-blue-800">Explication: </span>
                          <span className="text-blue-700">{question.explanation}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => {
                setSelectedAssessment(null);
                setResults(null);
              }}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Retour aux évaluations
            </button>
            {!results.attempt.passed && selectedAssessment.maxAttempts > 1 && (
              <button
                onClick={() => handleStartAssessment(selectedAssessment)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Nouvelle tentative
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Interface de passage de l'évaluation
  if (currentAttempt && selectedAssessment) {
    const currentQuestion = selectedAssessment.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedAssessment.questions.length) * 100;

    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* En-tête avec timer et progression */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{selectedAssessment.title}</h1>
            {timeLeft > 0 && (
              <div className="flex items-center space-x-2 text-red-600">
                <Clock className="h-5 w-5" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} sur {selectedAssessment.questions.length}
          </div>
        </div>

        {/* Question actuelle */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4 mb-8">
            {currentQuestion.type === 'multiple_choice' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option: string, index: number) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'true_false' && (
              <div className="space-y-3">
                {['Vrai', 'Faux'].map((option) => (
                  <label key={option} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'essay' && (
              <textarea
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre réponse..."
              />
            )}

            {currentQuestion.type === 'fill_blank' && (
              <input
                type="text"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre réponse..."
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Précédent
            </button>

            {currentQuestionIndex === selectedAssessment.questions.length - 1 ? (
              <button
                onClick={handleSubmitAssessment}
                disabled={isSubmitting}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? 'Soumission...' : 'Terminer l\'évaluation'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Suivant
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Liste des évaluations disponibles
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Évaluations</h1>
        <p className="text-gray-600">Testez vos connaissances avec nos évaluations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                assessment.type === 'quiz' ? 'bg-blue-100 text-blue-800' :
                assessment.type === 'exam' ? 'bg-red-100 text-red-800' :
                'bg-green-100 text-green-800'
              }`}>
                {assessment.type === 'quiz' ? 'Quiz' :
                 assessment.type === 'exam' ? 'Examen' : 'Devoir'}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Questions:</span>
                <span className="font-medium">{assessment.questions.length}</span>
              </div>
              {assessment.timeLimit && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Durée:</span>
                  <span className="font-medium">{assessment.timeLimit} min</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Score requis:</span>
                <span className="font-medium">{assessment.passingScore}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tentatives max:</span>
                <span className="font-medium">{assessment.maxAttempts}</span>
              </div>
            </div>

            <button
              onClick={() => handleStartAssessment(assessment)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Commencer l'évaluation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentTaking;