import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  experience?: string;
  isVerified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  experience?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem("zse_training_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("zse_training_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Note: This is a placeholder implementation
      // In a real app, this would integrate with Supabase Auth
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - replace with actual Supabase authentication
      const mockUser: User = {
        id: "mock-user-id",
        email,
        firstName: "John",
        lastName: "Doe",
        isVerified: true,
        createdAt: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem("zse_training_user", JSON.stringify(mockUser));
      
      // This would throw an error since Supabase isn't connected
      throw new Error("Authentication requires Supabase integration");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupData): Promise<void> => {
    setIsLoading(true);
    try {
      // Note: This is a placeholder implementation
      // In a real app, this would integrate with Supabase Auth
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation - replace with actual Supabase user creation
      const newUser: User = {
        id: "mock-new-user-id",
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        experience: userData.experience,
        isVerified: false,
        createdAt: new Date().toISOString()
      };
      
      setUser(newUser);
      localStorage.setItem("zse_training_user", JSON.stringify(newUser));
      
      // This would throw an error since Supabase isn't connected
      throw new Error("User registration requires Supabase integration");
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Clear user data
      setUser(null);
      localStorage.removeItem("zse_training_user");
      
      // Note: In a real app, this would also invalidate the Supabase session
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    if (!user) throw new Error("No user logged in");
    
    setIsLoading(true);
    try {
      // Note: This would integrate with Supabase to update user profile
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("zse_training_user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};