import { LoginResponse, LoginSend, RegisterSend } from "@/providers/auth/types";
import { post } from "./request";

export function loginApi(payload: LoginSend) {
  return post<LoginResponse>("/api/auth/login", payload);
}

export function registerApi(payload: RegisterSend) {
  return post<LoginResponse>("/api/auth/register", payload);
}
