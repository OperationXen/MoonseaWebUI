"use client";

import { useQuery } from "@tanstack/react-query";
import api from "./base";

import type { UserStatus } from "@/types/user";

async function getUserDetails() {
  return api.get("/api/auth/user_details").then((r) => {
    return r.data.results as UserStatus;
  });
}

export function useUserStatus() {
  return useQuery({
    queryKey: ["user-status"],
    queryFn: () => getUserDetails(),
  });
}
