"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

import { useUserStatus } from "@/data/fetch/auth";

export function AuthenticationRequired(props: PropsWithChildren) {
  const { data: userStatus, isLoading } = useUserStatus();
  const router = useRouter();

  if (isLoading) return null;
  if (!userStatus?.authenticated) {
    router.push("/auth/login");
    return null;
  }
  return props.children;
}

export default AuthenticationRequired;
