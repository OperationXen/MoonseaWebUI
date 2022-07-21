import { useState } from "react";

import { Dialog, Typography, Divider, Box } from "@mui/material";
import { Button, TextField, Stack } from "@mui/material";

import userStore from "../../datastore/user";
import useSnackBar from "../../datastore/snackbar";
import { updateDiscordID, updatePassword } from "../../api/user";

export default function ProfileWindow(props) {
  const [username, discord] = userStore((s) => [s.username, s.discordID]);
  const displayMessage = useSnackBar((s) => s.displayMessage);
  const [discordID, setDiscordID] = useState(discord || "");
  const [oldPass, setOldPass] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [highlight, setHighlight] = useState(false);

  const handleClose = () => {
    setOldPass("");
    setNewPass1("");
    setNewPass2("");
    props.onClose();
  };

  const changeDiscordID = () => {
    updateDiscordID(discordID)
      .then((response) => {
        displayMessage("Discord details updated", "success");
      })
      .catch((error) => {
        displayMessage("Unable to update details", "error");
      });
  };

  const changePassword = () => {
    updatePassword(oldPass, newPass1, newPass2)
      .then((response) => {
        displayMessage("Password updated", "success");
      })
      .catch((error) => {
        displayMessage(error.response.data.message[0], "error");
      });
  };

  const checkDiscordID = () => {
    let retval = !!discordID.match(/[a-zA-Z]+#[0-9]{4}/);
    return retval;
  };

  const discordIDChanged = () => {
    if (!discordID) return false;
    if (discordID === discord) return false;
    return true;
  };

  const verifyPassword = () => {
    if (!oldPass || oldPass.length < 8) return false;
    if (!newPass1) return false;
    if (newPass1 === newPass2) return true;
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "30em",
          border: "2px solid black",
          borderRadius: "16px",
          boxShadow: "2px 2px 60px black",
          padding: "1.2em",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Typography variant="h4" marginLeft="0.4em">
        Edit profile for {username}
      </Typography>
      <Divider variant="middle">Discord information</Divider>
      <Box
        margin="0.6em 0"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          sx={{ flexGrow: 3 }}
          label="Discord ID"
          value={discordID}
          onChange={(e) => setDiscordID(e.target.value)}
          error={discordIDChanged() && !checkDiscordID()}
          placeholder="Username#1234"
        ></TextField>
        <Button
          sx={{ flexGrow: 1, marginLeft: "0.4em", alignSelf: "stretch" }}
          variant="outlined"
          disabled={!discordIDChanged() || !checkDiscordID()}
          onClick={changeDiscordID}
        >
          Update
        </Button>
      </Box>
      <Divider variant="middle">Authentication</Divider>
      <Stack margin="0.6em 0" spacing={2} sx={{ alignItems: "center" }}>
        <TextField
          label="Current Password"
          fullWidth
          type="password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
          placeholder="Enter current password for security"
          error={highlight && !oldPass}
        ></TextField>
        <TextField
          label="New password"
          fullWidth
          type="password"
          value={newPass1}
          onChange={(e) => setNewPass1(e.target.value)}
          placeholder="Pick a new password"
          error={highlight && !newPass1}
        ></TextField>
        <TextField
          label="Confirm new password"
          fullWidth
          type="password"
          value={newPass2}
          onChange={(e) => setNewPass2(e.target.value)}
          placeholder="Confirm your new password"
          error={highlight && (newPass1 !== newPass2 || !newPass2)}
        ></TextField>
        <Box
          onMouseOver={() => setHighlight(true)}
          onMouseOut={() => setHighlight(false)}
        >
          <Button disabled={!verifyPassword()} onClick={changePassword}>
            Change Password
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
}
