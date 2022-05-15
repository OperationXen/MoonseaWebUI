import { Card, CardContent, CardMedia, CardActions } from "@mui/material";
import { Typography, IconButton, Button } from "@mui/material";
import { Tooltip, Avatar } from "@mui/material";

import StatSummaryWidget from "./StatSummaryWidget";
import ItemSummaryWidget from "./ItemSummaryWidget";

export default function CharacterSummaryCard(props) {
  const { character } = props;

  const getTier = () => {
    if (character.level >= 17) return "Tier 4";
    if (character.level >= 11) return "Tier 3";
    if (character.level >= 5) return "Tier 2";
    return "Tier 1";
  };

  return (
    <Card sx={{ width: "400px", border: "1px solid black" }}>
      <CardMedia
        component="img"
        height="250px"
        image="https://i.pinimg.com/originals/9a/d0/52/9ad052721c009d7377353e725add74a3.png"
        //image={character.token}
        alt={character.name}
      />
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
            <Typography gutterBottom variant="h5" component="div">
              {character.level}
            </Typography>
          </Tooltip>
        </div>
        <Typography variant="body2" color="text.secondary">
          {character.race}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {character.classes}
        </Typography>
        <StatSummaryWidget character={character} />
        <ItemSummaryWidget items={character.equipped_items} />
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title="Go to character details">
          <Button>View Details</Button>
        </Tooltip>
        <Tooltip title="View character sheet on D&D Beyond">
          <Avatar src={"/icons/beyond2.png"} onClick={() => alert("pew")} />
        </Tooltip>
      </CardActions>
    </Card>
  );
}
