import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Avatar, Typography } from "@mui/material";

export default function ItemSummaryWidget(props) {
  const { items } = props;

  const getRarityColour = (rarity) => {
    if (rarity == "legendary") return "orange";
    if (rarity == "veryrare") return "purple";
    if (rarity == "rare") return "blue";
    if (rarity == "uncommon") return "darkgreen";
    return "darkgrey";
  };

  if (!items) return null;

  return (
    <List>
      {items.map((item) => {
        return (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar sx={{ width: 24, height: 24 }} />
            </ListItemAvatar>
            <Typography
              sx={{ color: getRarityColour(item.rarity), fontWeight: "bold" }}
            >
              {item.name}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
}
