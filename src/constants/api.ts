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
  ADMIN_COURSES: "/admin/courses",
  ADMIN_USERS: "/admin/users",
  ADMIN_CREATE_COURSE: "/admin/courses",
  ADMIN_UPDATE_COURSE: (id: string | number) => `/admin/courses/${id}`,
  ADMIN_DELETE_COURSE: (id: string | number) => `/admin/courses/${id}`,
  
  // Blog endpoints
  BLOG_POSTS: "/blog",
  BLOG_POST_DETAIL: (id: string | number) => `/blog/${id}`,
} as const;
