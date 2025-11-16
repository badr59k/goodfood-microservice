import { createContext, useContext, useMemo, useState } from "react";
import { LoginSend, RegisterSend } from "./types";
import { SafeAreaView } from "react-native-safe-area-context";
import { getToken, saveToken } from "@/storage/secureStore";
import { loginApi, registerApi } from "@/services/authApi";

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginSend) => Promise<void>;
  register: (payload: RegisterSend) => Promise<void>;
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
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo<AuthState>(
    () => ({ isLoading, isAuthenticated, login, register }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>children</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx;
};
