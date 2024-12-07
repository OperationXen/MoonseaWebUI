import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@mui/material";

import userStore from "@/datastore/user";
import { doLogout } from "@/api/user";

export default function AuthButton() {
  const pathname = usePathname();
  const authenticated = userStore((s) => s.authenticated);

  if (authenticated) {
    return (
      <Button sx={{ color: "white" }} onClick={doLogout}>
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
