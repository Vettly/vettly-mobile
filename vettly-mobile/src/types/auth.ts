export const UserRole = {
  Candidate: "candidate",
  Recruiter: "recruiter",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  accessToken: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}
