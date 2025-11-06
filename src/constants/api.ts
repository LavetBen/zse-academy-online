// Centralized API configuration
export const API_BASE_URL = "http://127.0.0.1:8000/api";

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: "/login",
  REGISTER: "/register",
  ME: "/me",
  LOGOUT: "/logout",

  // Course endpoints
  COURSES: "/courses",
  MY_COURSES: "/my/courses",
  COURSE_DETAIL: (id: string | number) => `/courses/${id}`,
  ENROLL_COURSE: (id: string | number) => `/courses/${id}/enroll`,

  // Admin endpoints
  ADMIN_COURSES: "/courses",
  ADMIN_USERS: "/users",
  ADMIN_CREATE_COURSE: "/courses",
  ADMIN_UPDATE_COURSE: (id: string | number) => `/courses/${id}`,
  ADMIN_DELETE_COURSE: (id: string | number) => `/courses/${id}`,

  // Admin Enrollments
  ADMIN_ENROLLMENTS: "/admin/enrollments", // <-- Added endpoint for fetching all enrollments

  // Course Content endpoints
  ADMIN_COURSE_CONTENT: (courseId: string | number) => `/courses/${courseId}/contents`,
  ADMIN_CREATE_CONTENT: (courseId: string | number) => `/courses/${courseId}/contents`,
  ADMIN_UPDATE_CONTENT: (courseId: string | number, contentId: string | number) =>
    `/courses/${courseId}/contents/${contentId}`,
  ADMIN_DELETE_CONTENT: (courseId: string | number, contentId: string | number) =>
    `/courses/${courseId}/contents/${contentId}`,

  // Blog endpoints
  BLOGS: "/blogs",
  BLOG_DETAIL: (id: string | number) => `/blogs/${id}`,
  BLOG_CREATE: "/blogs",
  BLOG_UPDATE: (id: string | number) => `/blogs/${id}`,
  BLOG_DELETE: (id: string | number) => `/blogs/${id}`,
} as const;
