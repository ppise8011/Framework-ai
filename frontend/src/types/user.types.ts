export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  userType: string;
  role?: "user" | "admin";
  profileImage?: string;
  company?: string;
  bio?: string;
  subscription?: Subscription;
}

export interface Subscription {
  id: string;
  planName: string;
  totalCredits: number;
  usedCredits: number;
  status: string;
  expiresAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  userType?: string;
}

export interface LoginData {
  email: string;
  password: string;
}
