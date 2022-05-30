import { useState } from "react";

import { Container, Box, Paper } from "@mui/material";
import { TextField, Typography, Button } from "@mui/material";

export default function LoginWindow() {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Paper>
        <Typography variant="h3">User login</Typography>
      </Paper>
    </Container>
  );
}
