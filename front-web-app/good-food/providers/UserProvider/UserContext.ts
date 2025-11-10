import { createContext } from "react";
import { TUserContext } from "./type";

export const userContext = createContext<TUserContext | null>(null);