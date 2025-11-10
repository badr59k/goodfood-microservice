export type TUser = {
  name: string;
  token: string;
}

export type TUserContext = {
  user: TUser | null;
  login: (data: TUserConexion) => void;
  logout: () => void;
  isSuccess: boolean;
  isError: boolean;
}

export type TUserConexion = {
  email: string;
  password: string;
}