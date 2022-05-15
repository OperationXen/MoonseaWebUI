import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Avatar, Typography } from "@mui/material";

export default function ItemSummaryWidget(props) {
  const { items } = props;

  if (!items) return null;

  return (
    <List>
      {items.map((item) => {
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ width: 24, height: 24 }} />
          </ListItemAvatar>
          <Typography sx={{ color: "darkgreen", fontWeight: "bold" }}>
            Magic Item
          </Typography>
        </ListItem>;
      })}
    </List>
  );
}
