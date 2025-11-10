import React, { createContext, ReactNode, useState } from 'react';
import { TUser, TUserConexion, TUserContext } from './type';
import { useMutation } from '@tanstack/react-query';
import { set } from 'react-hook-form';

export const userContext = createContext<TUserContext | null>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const { isError, isSuccess, mutate } = useMutation({
    mutationFn: async (data: TUserConexion) => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_AUTH}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          motDePasse: data.password
        }),
      }).then((res) => res.json());
      setUser(response as TUser);
    },

  });
  const login = (data: TUserConexion) => {
    mutate(data);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <userContext.Provider value={{ user, login, logout, isSuccess, isError }}>
      {children}
    </userContext.Provider>
  );
};