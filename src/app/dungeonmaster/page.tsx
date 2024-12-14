"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUserStatus } from "@/data/fetch/auth";

export default function DungeonMasterPage() {
  const router = useRouter();
  const { data: userStatus } = useUserStatus();

  useEffect(() => {
    if (userStatus?.authenticated) {
      router.push(`/dungeonmaster/${userStatus.dmUUID}`);
    }
    router.push("/auth/login");
  }, []);

  return null;
}
