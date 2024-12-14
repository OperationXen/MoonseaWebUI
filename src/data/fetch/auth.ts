"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./base";

import type { UserStatus } from "@/types/user";

type Credentials = {
  username: string;
  password: string;
};

// Get the currently logged in user's details
async function getUserStatus() {
  return api.get("/api/auth/user_details").then((r) => {
    const status: UserStatus = {
      authenticated: true,
      ...r.data,
    };
    return status;
  });
}

// Logs the user in and updates the user information store
async function doLogin(creds: Credentials) {
  return api.post("/api/auth/login", creds);
}

// Log user out and clear user information
async function doLogout() {
  return api.post("api/auth/logout");
}

// hook, bundles everything up nicely for ease of use
export function useUserStatus() {
  const queryClient = useQueryClient();

  const dataFetch = useQuery({
    queryKey: ["user-status"],
    queryFn: () => getUserStatus(),
  });

  const login = useMutation({
    mutationFn: (loginData: Credentials) => doLogin(loginData),
    onSuccess: (response) => {
      queryClient.setQueryData(["user-status"], {
        authenticated: true,
        username: response.data.username,
        email: response.data.email,
        discordID: response.data.discord_id,
        dmUUID: response.data.dm_info[0].uuid,
        dmHours: response.data.dm_info[0].hours,
      });
    },
  });

  const logout = useMutation({
    mutationFn: doLogout,
    onSuccess: () => {
      queryClient.setQueryData(["user-status"], { authenticated: false });
    },
  });

  return {
    login: login.mutateAsync,
    logout: logout.mutateAsync,
    changePassword: null,
    changeDetails: null,
    ...dataFetch,
  };
}
