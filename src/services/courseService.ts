import { apiClient } from "@/utils";
import type {
  Course,
  CourseFilters,
  CoursesResponse,
} from "@/types/course.types";

export interface CreateCourseData {
  title: string;
  description: string;
  duration: string; // Adapté pour correspondre au type partagé (string)
  category?: string;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  thumbnail_url?: string;
}

export interface UpdateCourseData {
  title?: string;
  description?: string;
  duration?: string;
  category?: string;
  level?: "beginner" | "intermediate" | "advanced";
  price?: number;
  thumbnail_url?: string;
}

class CourseService {
  private readonly endpoint = "api/v1/courses";

  async getAllCourses(filters?: CourseFilters): Promise<CoursesResponse> {
    const queryParams = filters
      ? new URLSearchParams(filters as any).toString()
      : "";
    const url = queryParams ? `${this.endpoint}?${queryParams}` : this.endpoint;
    return await apiClient.getAll(url);
  }

  async getCourseById(id: string): Promise<Course> {
    return await apiClient.getById(this.endpoint, id);
  }

  async createCourse(courseData: CreateCourseData): Promise<Course> {
    return await apiClient.create(this.endpoint, courseData);
  }

  async updateCourse(
    id: string,
    courseData: UpdateCourseData
  ): Promise<Course> {
    return await apiClient.update(`${this.endpoint}/${id}`, courseData);
  }

  async publishCourse(id: string): Promise<Course> {
    return await apiClient.patch(`${this.endpoint}/${id}`, {
      isPublished: true,
    });
  }

  async unpublishCourse(id: string): Promise<Course> {
    return await apiClient.patch(`${this.endpoint}/${id}`, {
      isPublished: false,
    });
  }

  async deleteCourse(id: string): Promise<void> {
    return await apiClient.deleteById(`${this.endpoint}/${id}`);
  }

  async getCoursesByInstructor(instructorId: string): Promise<Course[]> {
    return await apiClient.getAll(
      `${this.endpoint}/instructor/${instructorId}`
    );
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return await apiClient.getAll(`${this.endpoint}/category/${category}`);
  }
}

export const courseService = new CourseService();
