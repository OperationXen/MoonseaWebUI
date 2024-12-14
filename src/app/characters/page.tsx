"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useCharacters } from "@/data/fetch/character";

import CreateCharacterWindow from "@/components/characters/CreateCharacterWindow";
import CharacterSummaryCard from "@/components/characters/CharacterSummaryCard";
import NoCharactersOverlay from "@/components/characters/NoCharactersOverlay";
import AuthenticationRequired from "@/components/user/AuthenticationRequired";
import LoadingOverlay from "@/components/general/LoadingOverlay";
import { useUserStatus } from "@/data/fetch/auth";

export default function Dashboard() {
  const { data: characters, isLoading } = useCharacters();
  const { data: userStatus, isLoading: checkingAuth } = useUserStatus();
  const router = useRouter();

  const [createOpen, setCreateOpen] = useState(false);

  if (isLoading || checkingAuth) return <LoadingOverlay open={true} />;
  if (!userStatus?.authenticated) {
    router.push("/auth/login");
    return null;
  }

  return (
    <AuthenticationRequired>
      <Box
        sx={{
          margin: "0.8em",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexGrow: 1,
          gap: "0.8em",
          paddingBottom: "1.4em",
        }}
      >
        {characters?.length === 0 && (
          <NoCharactersOverlay onClick={() => setCreateOpen(true)} />
        )}
        {characters?.map((character: any) => (
          <CharacterSummaryCard key={character.uuid} character={character} />
        ))}
      </Box>
      <Fab
        color="primary"
        onClick={() => setCreateOpen(true)}
        sx={{ position: "fixed", right: "2em", bottom: "2em" }}
      >
        <AddIcon />
      </Fab>
      <CreateCharacterWindow
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </AuthenticationRequired>
  );
}
