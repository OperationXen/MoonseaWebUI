import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";

import userStore from "../../datastore/user";

export default function ProfileWidget() {
  const { username } = userStore.getState();

  return (
    <Avatar
      sx={{
        color: "white",
        bgcolor: blue[800],
        boxShadow: "0px 0px 4px",
        "&:hover": { boxShadow: "0px 0px 6px" },
      }}
    >
      {username[0].toUpperCase() || "?"}
    </Avatar>
  );
}
