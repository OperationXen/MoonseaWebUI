import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardMedia, CardActions } from "@mui/material";
import { Typography, ButtonGroup, Button } from "@mui/material";
import { Tooltip, Avatar, Divider } from "@mui/material";

import ShareIcon from "@mui/icons-material/Share";
import AddBoxIcon from "@mui/icons-material/AddBox";

import useSnackbar from "../../datastore/snackbar";
import StatSummaryWidget from "./StatSummaryWidget";
import ItemSummaryWidget from "./ItemSummaryWidget";
import { getCharClassShort } from "../../utils/format";

export default function CharacterSummaryCard(props) {
  const { character } = props;
  const navigate = useNavigate();
  const snackbar = useSnackbar((s) => s.displayMessage);

  const detailsLink = "/character/" + character.uuid; // link to full character sheet
  const classesText = getCharClassShort(character.classes);

  const copyCharacterLink = () => {
    navigator.clipboard.writeText(
      window.location.origin + "/moonseacodex" + detailsLink
    );
    snackbar("Copied character link to clipboard");
  };
  const openDetails = () => {
    navigate(detailsLink);
  };
  const getTokenURL = () => {
    if (character.token) return character.token;
    return "/moonseacodex/images/placegoblin-token.jpg";
  };

  const getTier = () => {
    if (character.level >= 17) return "Tier 4";
    if (character.level >= 11) return "Tier 3";
    if (character.level >= 5) return "Tier 2";
    return "Tier 1";
  };

  return (
    <Card
      sx={{
        width: "25em",
        border: "1px solid black",
        borderRadius: "10px",
        margin: "0.5em",
        padding: "0.2em",
      }}
    >
      <Tooltip
        title={character.token ? "Character token" : "Character token not set!"}
      >
        <CardMedia
          component="img"
          height="320px"
          image={getTokenURL()}
          alt={character.name}
        />
      </Tooltip>
      <Divider variant="middle" sx={{ marginTop: "0.2em" }} />
      <CardContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {character.name}
          </Typography>
          <Tooltip title={getTier()}>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ cursor: "context-menu" }}
            >
              {character.level}
            </Typography>
          </Tooltip>
        </div>
        <Typography variant="body2" color="text.secondary">
          {character.race}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {classesText || "Commoner"}
        </Typography>
        <StatSummaryWidget character={character} />
        <ItemSummaryWidget items={character.equipped_items} />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "0em",
        }}
      >
        <Tooltip title="Add an event, such as a game or a DM reward">
          <AddBoxIcon
            sx={{ width: 40, height: 40, cursor: "pointer" }}
            onClick={() => {}}
          />
        </Tooltip>

        <ButtonGroup>
          <Tooltip title="Go to character details">
            <Button onClick={openDetails}>View Details</Button>
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
              src={`${process.env.PUBLIC_URL}/icons/beyond2.png`}
              sx={{ width: 40, height: 40, opacity: 0.9, cursor: "pointer" }}
              onClick={() => window.open(character.sheet)}
            />
          </Tooltip>
        )) || (
          <Tooltip title="No character sheet set">
            <Avatar
              src={`${process.env.PUBLIC_URL}/icons/beyond2.png`}
              sx={{ width: 40, height: 40, opacity: 0.3 }}
            />
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}
