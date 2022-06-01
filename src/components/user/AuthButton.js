import { Button } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import userStore from "../../datastore/user";

export default function AuthButton() {
  const username = userStore((s) => s.username);

  if (username) return null;

  return (
    <Routes>
      <Route
        path="/register"
        element={<Button sx={{ color: "white" }}>Login</Button>}
      />
      <Route
        path="/login"
        element={<Button sx={{ color: "white" }}>Register</Button>}
      />
      <Route
        path="/*"
        element={<Button sx={{ color: "white" }}>Login</Button>}
      />
    </Routes>
  );
}
