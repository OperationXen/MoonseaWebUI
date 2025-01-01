import Link from "next/link";

import { Card, Box, CardMedia } from "@mui/material";
import { Typography, ButtonGroup, Button } from "@mui/material";
import { Tooltip, Avatar, Divider } from "@mui/material";

import ShareIcon from "@mui/icons-material/Share";
import AddBoxIcon from "@mui/icons-material/AddBox";

import useSnackbar from "@/datastore/snackbar";
import StatSummaryWidget from "./StatSummaryWidget";
import ItemSummaryWidget from "@/components/items/ItemSummaryWidget";
import { getCharClassShort } from "@/utils/format";
import type { Character } from "@/types/character";

type PropsType = {
  character: Character;
};

const defaultToken = "/media/images/placegoblin-token.png";

export default function CharacterSummaryCard(props: PropsType) {
  const { character } = props;

  const snackbar = useSnackbar((s) => s.displayMessage);
  const classesText = getCharClassShort(character.classes);

  const copyCharacterLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/moonseacodex");
    snackbar("Copied character link to clipboard");
  };

  const getTokenURL = () => {
    if (character.token) return character.token;
    return defaultToken;
  };

  const getTier = () => {
    if (character.level >= 17) return "Tier 4";
    if (character.level >= 11) return "Tier 3";
    if (character.level >= 5) return "Tier 2";
    return "Tier 1";
  };

  return (
    <Card className="p-1 border-solid rounded-lg border w-96">
      <Tooltip
        title={character.token ? "Character token" : "Character token not set!"}
      >
        <CardMedia
          className="rounded-lg overflow-hidden h-72"
          component="img"
          src={getTokenURL()}
          alt={character.name}
        />
      </Tooltip>
      <Divider className="m-1" />
      <Box className="mx-2">
        <Box className="flex justify-between items-center">
          <Typography variant="h5" component="div">
            {character.name}
          </Typography>
          <Tooltip title={getTier()}>
            <Typography variant="h5" sx={{ cursor: "context-menu" }}>
              {"Level " + character.level}
            </Typography>
          </Tooltip>
        </Box>
        <Box className="flex justify-between items-center">
          <Typography variant="body2" color="text.secondary">
            {character.race}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {classesText || "Commoner"}
          </Typography>
        </Box>
              <Divider className="m-1" />
        <StatSummaryWidget character={character} />
              <Divider className="m-1" />
        <ItemSummaryWidget items={character.items} />
              
      </Box>
      <Divider className="m-1"/>
      <Box className="flex justify-between items-center">
        <Tooltip title="Add an event, such as a game or a DM reward">
          <AddBoxIcon
            sx={{ width: 40, height: 40, cursor: "pointer" }}
            onClick={() => {}}
          />
        </Tooltip>

        <ButtonGroup>
          <Tooltip title="Go to character details">
            <Link href={`/character/${character.uuid}`} passHref>
              <Button>View Details</Button>
            </Link>
          </Tooltip>
          <Tooltip title="Copy link to character">
            <Button onClick={copyCharacterLink}>
              <ShareIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>

        {(character.sheet && (
          <Tooltip title="View character sheet on D&D Beyond">
            <Avatar
              src={"/media/icons/beyond2.png"}
              sx={{
                width: 40,
                height: 40,
                opacity: 0.9,
                cursor: "pointer",
              }}
              onClick={() => window.open(character.sheet)}
            />
          </Tooltip>
        )) || (
          <Tooltip title="No character sheet set">
            <Avatar
              src={"/media/icons/beyond2.png"}
              sx={{ width: 40, height: 40, opacity: 0.3 }}
            />
          </Tooltip>
        )}
      </Box>
    </Card>
  );
}
