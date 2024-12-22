"use client";

import { useState } from "react";

import { Tooltip, Box, Typography, Link } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";
import { default as DowntimeIcon } from "@mui/icons-material/Hotel";
import { GiTwoCoins } from "react-icons/gi";

import CharacterControls from "@/components/characters/CharacterControls";
import BiographyControlButton from "./biography/BiographyControlButton";
import DMNotesControlButton from "./biography/DMNotesControlButton";
import CharacterLevelsPane from "./CharacterLevelsPane";
import BiographyModal from "./biography/BiographyModal";
import DMNotesModal from "./biography/DMNotesModal";
import useSnackbar from "@/datastore/snackbar";
import VisionWidget from "./VisionWidget";
import StatsWidget from "./StatsWidget";

import type { Character } from "@/types/character";

const dataBoxStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-evenly",
  padding: "0.4em",
};

type PropsType = {
  character: Character;
  updateCharacter: (x: Partial<Character>) => Promise<any>;
};

export function CharacterDetailsPane(props: PropsType) {
  const { character, updateCharacter } = props;

  const { displayMessage } = useSnackbar();

  const [bioOpen, setBioOpen] = useState(false);
  const [dmNotesOpen, setDMNotesOpen] = useState(false);

  if (!character) return null;
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxHeight: "35em",
        display: "flex",
      }}
    >
      <Box
        sx={{
          marginX: "1em",
          flexGrow: 1,
          flexShrink: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tooltip title="Open character sheet in a new window">
            <Link
              href={character.sheet}
              target="_blank"
              rel="noopener"
              variant="h5"
              underline="hover"
              color="inherit"
            >
              {character.name}
            </Link>
          </Tooltip>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip
                title={
                  character.race === "Kobold" ? "Yip yip" : "Character race"
                }
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#424242",
                    cursor: "pointer",
                    marginRight: "0.2em",
                  }}
                >
                  {character.race}
                </Typography>
              </Tooltip>
              <VisionWidget
                editable={character.editable}
                vision={character.vision}
                doUpdate={updateCharacter}
              />
            </Box>
            <Tooltip title="Character level">
              <Typography variant="h5" sx={{ cursor: "pointer" }}>
                {character.level}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            height: "calc(100% - 2.5em)",
            flexFlow: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ ...dataBoxStyle }}>
            <StatsWidget
              locked={!character.editable}
              name="AC"
              icon={<ShieldIcon fontSize="small" />}
              value={character.ac}
              setValue={(val: number) => updateCharacter({ ac: val })}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              locked={!character.editable}
              name="HP"
              icon={<HealthIcon fontSize="small" />}
              value={character.hp}
              setValue={(val: number) => updateCharacter({ hp: val })}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              locked={!character.editable}
              name="PP"
              icon={<PerceptionIcon fontSize="small" />}
              value={character.pp}
              setValue={(val: number) => updateCharacter({ pp: val })}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              locked={!character.editable}
              name="DC"
              icon={<SaveDCIcon fontSize="small" />}
              value={character.dc}
              setValue={(val: number) => updateCharacter({ dc: val })}
              sx={{ width: "25%" }}
            />
          </Box>
          <Box sx={dataBoxStyle}>
            <StatsWidget
              locked={!character.editable}
              name="Gold"
              icon={<GiTwoCoins />}
              value={character.gold}
              setValue={(val: number) => updateCharacter({ gold: val })}
              sx={{ width: "25%" }}
            />
            <StatsWidget
              locked={!character.editable}
              name="Downtime"
              icon={<DowntimeIcon fontSize="small" />}
              value={character.downtime}
              setValue={(val: number) => updateCharacter({ downtime: val })}
              sx={{ width: "25%" }}
            />
          </Box>
          <CharacterLevelsPane character={character} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "3em",
          borderLeft: "1px solid",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CharacterControls character={character} />
        <Box sx={{ flexGrow: 1 }} />
        <BiographyControlButton setOpen={() => setBioOpen(true)} />
        <DMNotesControlButton setOpen={() => setDMNotesOpen(true)} />
      </Box>
      <BiographyModal
        open={bioOpen}
        onClose={() => setBioOpen(false)}
        text={character.biography}
        setText={(newVal) =>
          updateCharacter({ biography: newVal }).then(() =>
            displayMessage("Biography updated", "success"),
          )
        }
      />
      <DMNotesModal
        open={dmNotesOpen}
        onClose={() => setDMNotesOpen(false)}
        text={character.dm_text}
        setText={(newVal) => {
          updateCharacter({ dm_text: newVal }).then(() =>
            displayMessage("Updated DM notes", "success"),
          );
        }}
      />
    </Box>
  );
}

export default CharacterDetailsPane;
