import { createContext, useContext, useMemo, useState } from "react";
import { LoginSend, RegisterSend } from "./types";
import { deleteToken, saveToken } from "@/storage/secureStore";
import { loginApi, registerApi } from "@/services/authApi";

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginSend) => Promise<void>;
  register: (payload: RegisterSend) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  //   function useEffect(()=>{(async ()=>{const token = await getToken();})();},[])
  const login = async (payload: LoginSend) => {
    setLoading(true);
    try {
      const resultat = await loginApi(payload);
      console.log(resultat);
      await saveToken(resultat.token);
      setAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterSend) => {
    setLoading(true);
    try {
      await registerApi(payload);
      // setAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await deleteToken();
    setAuthenticated(false);
  };

  const value = useMemo<AuthState>(
    () => ({ isLoading, isAuthenticated, login, register, logout }),
    [isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Error UseAuth is null");
  return ctx;
};
