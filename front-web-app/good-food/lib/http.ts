import { userContext } from "@/providers/UserProvider/UserProvider";
import { useContext } from "react";
import { Platform } from "react-native";

export class HttpError extends Error {
  status: number;
  payload?: unknown;
  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export const useFetcher = () => {
  const user = useContext(userContext);
  const token = user?.user?.token;
  return async (
    endpoint: string,
    data?: unknown,
    method: string = 'GET',
    contentType: string = 'application/json'
  ) => {
    const url = `localhost:8081/api/auth/`;
    console.log(url);
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    console.log(JSON.stringify(data));
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const fetchOptions: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    const response = await fetch(url, fetchOptions);

    if (contentType === "application/octet-stream") {
      return response.blob();
    }
    return response.json();
  };
};