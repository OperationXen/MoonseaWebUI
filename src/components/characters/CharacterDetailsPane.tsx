import { Tooltip, Box, Typography, Link, Grid } from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import { default as HealthIcon } from "@mui/icons-material/LocalHospital";
import { default as PerceptionIcon } from "@mui/icons-material/Visibility";
import { default as SaveDCIcon } from "@mui/icons-material/AutoFixNormal";
import { default as DowntimeIcon } from "@mui/icons-material/Hotel";
import { GiTwoCoins } from "react-icons/gi";

import CharacterControls from "@/components/characters/CharacterControls";
import CharacterLevelsPane from "./CharacterLevelsPane";
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

  if (!character) return null;
  return (
    <Box
      sx={{
        flexGrow: 100,
        maxHeight: "35em",
        display: "flex",
      }}
    >
      <Box
        sx={{
          padding: "0.2em",
          flexGrow: 100,
          flexShrink: 1,
        }}
      >
        <Grid container height="2.2em">
          <Grid item xs={7}>
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
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
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
          </Grid>
          <Grid item xs={1} textAlign={"right"}>
            <CharacterControls character={character} />
          </Grid>
        </Grid>
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
    </Box>
  );
}

export default CharacterDetailsPane;
