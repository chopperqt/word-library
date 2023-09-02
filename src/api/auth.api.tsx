import { ApiError } from "@supabase/supabase-js";
import { loadingController } from "helpers/loadingController";
import supabase from "./client";

export type AuthRequests =
  | "loginWithGoogle"
  | "signUp"
  | "validateEmail"
  | "deleteUser"
  | "login"
  | "getUser"
  | "signIn";

export type UserEmail = string;
export type UserID = string;
export type UserPassword = string;

export interface LoginData {
  login: string;
  password: string;
}

export const signIn = async ({
  login,
  password,
}: LoginData): Promise<{ id: string; role: string; email: string } | null> => {
  const { handleSetError, handleSetPending, handleSetSuccess } =
    loadingController("signIn");

  handleSetPending();

  const { error, user } = await supabase.auth.signIn({
    email: login,
    password,
  });

  if (error || !user || !user?.id || !user?.email || !user?.role) {
    handleSetError();

    return null;
  }

  const { id, role, email } = user;

  handleSetSuccess();

  return {
    id,
    role,
    email,
  };
};

export const logOut = async (): Promise<ApiError | null> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return error;
  }

  return null;
};
