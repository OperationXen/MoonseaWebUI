import { useState } from "react";

import { Box, Paper } from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";

import { doLogin } from "../../api/user";

export default function LoginWindow() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    doLogin(username, password);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          marginTop: "10%",
          width: "25em",
          display: "flex",
          padding: "0.8em 2em",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">User login</Typography>
        <Box sx={{ margin: "0.4em", width: "100%" }}>
          <TextField
            fullWidth
            value={username}
            label="Username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box sx={{ margin: "0.4em", width: "100%" }}>
          <TextField
            fullWidth
            value={password}
            label="Password"
            type="password"
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button
          sx={{ width: "50%", margin: "0.4em" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
