import { LoginResponse, LoginSend, RegisterSend } from "@/providers/auth/types";
import { post } from "./request";

export function loginApi(payload: LoginSend) {
  return post<LoginResponse>("/login", "auth", payload);
}

export function registerApi(payload: RegisterSend) {
  return post<LoginResponse>("/register", "auth", payload);
}
