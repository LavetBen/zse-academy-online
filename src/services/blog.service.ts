import { apiClient } from "./api";
import { API_ENDPOINTS } from "@/constants/api";

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  thumbnail_url?: string;
  author?: {
    id: number;
    name: string;
  };
  category?: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const blogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    const response = await apiClient.get(API_ENDPOINTS.BLOG_POSTS);
    return response.data.data || response.data;
  },

  getPostById: async (id: string | number): Promise<BlogPost> => {
    const response = await apiClient.get(API_ENDPOINTS.BLOG_POST_DETAIL(id));
    return response.data;
  },

  createPost: async (postData: Partial<BlogPost>) => {
    const response = await apiClient.post(API_ENDPOINTS.BLOG_POSTS, postData);
    return response.data;
  },

  updatePost: async (id: string | number, postData: Partial<BlogPost>) => {
    const response = await apiClient.put(`${API_ENDPOINTS.BLOG_POSTS}/${id}`, postData);
    return response.data;
  },

  deletePost: async (id: string | number) => {
    const response = await apiClient.delete(`${API_ENDPOINTS.BLOG_POSTS}/${id}`);
    return response.data;
  },
};
