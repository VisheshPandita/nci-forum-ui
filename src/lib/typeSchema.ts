export type RegisterUserSchema = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  role: "USER" | "ADMIN";
};

export type ResponseUserSchema = {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  role: "USER" | "ADMIN";
};

export type LoginUserSchema = {
  username: string;
  password: string;
};

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}
