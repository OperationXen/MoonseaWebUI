import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@mui/material";

import { useUserStatus } from "@/data/fetch/auth";

export default function AuthButton() {
  const pathname = usePathname();
  const { data: userStatus, logout } = useUserStatus();

  if (userStatus?.authenticated) {
    return (
      <Button sx={{ color: "white" }} onClick={() => logout()}>
        Logout
      </Button>
    );
  } else if (pathname === "/auth/login") {
    return (
      <Link href="/auth/register" passHref>
        <Button sx={{ color: "white" }}>Register</Button>
      </Link>
    );
  } else
    return (
      <Link href="/auth/login" passHref>
        <Button sx={{ color: "white" }}>Login</Button>
      </Link>
    );
}
