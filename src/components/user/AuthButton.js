import { Button } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";

import userStore from "../../datastore/user";
import { doLogout } from "../../api/user";

export default function AuthButton() {
  const navigate = useNavigate();
  const authenticated = userStore((s) => s.authenticated);

  if (authenticated)
    return (
      <Button sx={{ color: "white" }} onClick={doLogout}>
        Logout
      </Button>
    );

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Button sx={{ color: "white" }} onClick={() => navigate("/register")}>
            Register
          </Button>
        }
      />
      <Route
        path="/*"
        element={
          <Button sx={{ color: "white" }} onClick={() => navigate("/login")}>
            Login
          </Button>
        }
      />
    </Routes>
  );
}
