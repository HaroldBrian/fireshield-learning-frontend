"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  TrendingUp,
  Clock,
  Trophy,
  Calendar,
  Play,
  ArrowRight,
  Video,
  FileText,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { courseService } from "@/services/courseService";
import { courseEnrollmentService } from "@/services/courseEnrollmentService";
import Link from "next/link";
import { Course, Enrollment } from "@/types";
import { CourseEnrollment } from "@/types/learner";
import Loader from "@/components/learnerComponents/Loader";

const DashboardPage = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [AllCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const coursesData = await courseService.getAllCourses({ limit: 3 });
        setRecommendedCourses(coursesData.data);
        const AllCoursesData = await courseService.getAllCourses({ limit: 10 });
        setAllCourses(AllCoursesData.data);

        const enrollmentsData = await courseEnrollmentService.getMyEnrollments({
          user_id: user?.id,
        });
        setEnrollments(enrollmentsData.enrollments);
      } catch (error) {
        console.error("Erreur lors du chargement du dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  const stats = [
    {
      title: "Formations en cours",
      value: enrollments.filter((e) => e.status === "active").length,
      icon: BookOpen,
      color: "text-primary-600",
      bgColor: "bg-primary-100",
    },
    {
      title: "Formations terminées",
      value: enrollments.filter((e) => e.status === "completed").length,
      icon: Trophy,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Heures d'apprentissage",
      value: "24h",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Progression moyenne",
      value: "73%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const upcomingSessions = [
    {
      id: "1",
      title: "Formation React Avancé",
      type: "video",
      time: "Aujourd'hui à 14h00",
      instructor: "Jean Dupont",
    },
    {
      id: "2",
      title: "Quiz JavaScript ES6",
      type: "quiz",
      time: "Demain à 10h00",
      instructor: "Marie Martin",
    },
    {
      id: "3",
      title: "Projet Final",
      type: "project",
      time: "Vendredi à 16h00",
      instructor: "Pierre Lambert",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Bon retour, {user?.firstName} ! 👋
          {localStorage.getItem("accessToken")}
          {Cookies.get("auth-token")}
        </h1>
        <p className="text-gray-600 mt-2">
          Continuez à développer vos compétences avec nos formations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formations en cours */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Formations en cours
              </h2>
              <Link
                href="/my-courses"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                Voir tout
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {enrollments.filter((e) => e.status === "active").length > 0 ? (
              <div className="space-y-4">
                {enrollments
                  .filter((e) => e.status === "active")
                  .map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-900">
                            {/* {enrollment.course.title} */}
                            {JSON.stringify(enrollment)}
                          </h3>
                          <div className="flex items-center mt-1">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full"
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {enrollment.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="btn-primary flex items-center">
                        <Play className="w-4 h-4 mr-2" />
                        Continuer
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucune formation en cours
                </h3>
                <p className="text-gray-600 mb-4">
                  Explorez notre catalogue pour commencer votre apprentissage
                </p>
                <Link href="/courses" className="btn-primary">
                  Explorer les formations
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Prochaines sessions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Prochaines sessions
            </h3>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      session.type === "video"
                        ? "bg-blue-100"
                        : session.type === "quiz"
                          ? "bg-yellow-100"
                          : "bg-green-100"
                    }`}
                  >
                    {session.type === "video" && (
                      <Video className="w-4 h-4 text-blue-600" />
                    )}
                    {session.type === "quiz" && (
                      <Trophy className="w-4 h-4 text-yellow-600" />
                    )}
                    {session.type === "project" && (
                      <FileText className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.title}
                    </p>
                    <p className="text-xs text-gray-500">{session.time}</p>
                    <p className="text-xs text-gray-400">
                      avec {session.instructor}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Actions rapides
            </h3>
            <div className="space-y-3">
              <Link
                href="/schedule"
                className="w-full btn-outline flex items-center justify-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Voir le planning
              </Link>
              <Link
                href="/certificates"
                className="w-full btn-outline flex items-center justify-center"
              >
                <Trophy className="w-4 h-4 mr-2" />
                Mes certificats
              </Link>
              <Link
                href="/messages"
                className="w-full btn-outline flex items-center justify-center"
              >
                Messages
              </Link>
            </div>
          </div>

          {/* Formations recommandées */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Formations recommandées
            </h3>
            <div className="space-y-4">
              {recommendedCourses.slice(0, 2).map((course) => (
                <div
                  key={course.id}
                  className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                    {course.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {course.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-medium text-sm">
                      {course.price === 0 ? "Gratuit" : `${course.price}€`}
                    </span>
                    <Link
                      href={`/courses/${course.id}`}
                      className="text-primary-600 hover:text-primary-700 text-xs font-medium"
                    >
                      Voir
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
