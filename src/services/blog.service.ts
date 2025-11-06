import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/blogs";

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  image?: string;
  user?: { name: string };
}

const getToken = () => localStorage.getItem("zse_training_token");

export const blogService = {
  getAllPosts: async () => {
    const res = await axios.get(API_URL,{
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  },

  createPost: async (data: Omit<BlogPost, "id">) => {
    const res = await axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  },

  updatePost: async (id: number, data: Partial<BlogPost>) => {
    const res = await axios.put(`${API_URL}/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  },

  deletePost: async (id: number) => {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  },
};
