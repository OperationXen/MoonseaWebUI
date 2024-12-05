"use client";

import { useRouter } from "next/navigation";

export function HomePage() {
  const router = useRouter();

  router.push("/characters");
  return null;
}
