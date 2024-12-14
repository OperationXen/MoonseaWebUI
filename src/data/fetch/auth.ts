"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./base";

import type { UserStatus } from "@/types/user";

type Credentials = {
  username: string;
  password: string;
}

// Get the currently logged in user's details
async function getUserStatus() {
  return api.get("/api/auth/user_details").then((r) => {
    const status: UserStatus = {
      authenticated: true,
      ...r.data
    }
    return status
  });
}


// Logs the user in and updates the user information store
async function doLogin(creds: Credentials) {
  let url = "api/auth/login";

  return api.post(url, creds).then((response) => {
    //let dm_info = response.data.dm_info[0];

    // userStore.setState({
    //   authenticated: true,
    //   username: response.data.username,
    //   email: response.data.email,
    //   discordID: response.data.discord_id,
    //   dmUUID: dm_info.uuid,
    //   dmHours: dm_info.hours,
    // });
  });
}

// Log user out and clear user information
async function doLogout() {
  const queryClient = useQueryClient();

  return api.post("api/auth/logout").then(() => {
    // mark the current user data invalid
    queryClient.invalidateQueries({queryKey:["user-status"]});  
  });
}




// hook, bundles everything up nicely for ease of use
export function useUserStatus() {
  const dataFetch = useQuery({
    queryKey: ["user-status"],
    queryFn: () => getUserStatus(),
  });

  const login = useMutation({mutationFn: (loginData: Credentials) => doLogin(loginData)})
  const logout = useMutation({mutationFn: doLogout})
  return {
    login: login.mutateAsync,
    logout: logout.mutateAsync,
    changePassword: null,
    changeDetails: null,
    ...dataFetch
  }
}

