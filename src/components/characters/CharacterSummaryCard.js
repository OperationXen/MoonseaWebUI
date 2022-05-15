import { Card, CardContent, CardMedia, CardActions } from "@mui/material";
import { Typography, IconButton, Button } from "@mui/material";
import { Tooltip, Avatar } from "@mui/material";

import StatSummaryRow from "./StatSummaryRow";

export default function CharacterSummaryCard(props) {
  const { character } = props;

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
          <Typography gutterBottom variant="h5" component="div">
            {character.level}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {character.race}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {character.classes}
        </Typography>
        <StatSummaryRow character={character} />
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
