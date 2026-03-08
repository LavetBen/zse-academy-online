import { apiClient } from "./api";
import { API_ENDPOINTS } from "@/constants/api";

export interface BlogPost {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  author?: { name: string; email: string };
  excerpt?: string;
  category?: string;
  read_time?: string;
  tags?: string[];
  featured?: boolean;
}

export const blogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    const res = await apiClient.get(API_ENDPOINTS.BLOGS);
    return res.data;
  },

  getPublicPosts: async (): Promise<BlogPost[]> => {
    const res = await apiClient.get("/public/blogs");
    return res.data;
  },

  getLatestPosts: async (): Promise<BlogPost[]> => {
    const res = await apiClient.get("/blogs/latest");
    return res.data;
  },

  getPostById: async (id: string | number): Promise<BlogPost> => {
    const res = await apiClient.get(`/public/blogs/${id}`);
    return res.data;
  },

  createPost: async (data: Omit<BlogPost, "id" | "user_id" | "created_at" | "updated_at">): Promise<BlogPost> => {
    const res = await apiClient.post(API_ENDPOINTS.BLOG_CREATE, data);
    return res.data;
  },

  updatePost: async (id: number, data: Partial<BlogPost>): Promise<BlogPost> => {
    const res = await apiClient.put(API_ENDPOINTS.BLOG_UPDATE(id), data);
    return res.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.BLOG_DELETE(id));
  },
};
