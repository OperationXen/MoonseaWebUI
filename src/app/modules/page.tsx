"use client";

import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";

import { Box, TextField } from "@mui/material";
import { Paper, Typography, InputAdornment } from "@mui/material";

import AuthenticationRequired from "@/components/user/AuthenticationRequired";
import ModulesGrid from "./ModulesGrid";

export default function PlayerModules() {
  const [search, setSearch] = useState("");

  return (
    <AuthenticationRequired>
      <Paper className="flex flex-col flex-grow px-2 pb-2 m-2">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className="mt-2 mb-1"
        >
          <Typography variant="h5">Module library</Typography>
          <TextField
            className="basis-1/2 min-w-96"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Search played modules"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <ModulesGrid search={search} />
      </Paper>
    </AuthenticationRequired>
  );
}
