"use client";

import { useState } from "react";

import { Dialog, Typography, Divider, Box } from "@mui/material";
import { Button, TextField, Stack } from "@mui/material";

import { useUserStatus } from "@/data/fetch/auth";
import useSnackBar from "@/datastore/snackbar";
import { checkDiscordID } from "@/utils/user";

type PropsType = {
  open: boolean;
  onClose: () => void;
};

export default function ProfileWindow(props: PropsType) {
  const { open, onClose } = props;

  const { data: userStatus, updateProfile, changePassword } = useUserStatus();
  const displayMessage = useSnackBar((s) => s.displayMessage);

  const [discordID, setDiscordID] = useState(userStatus?.discordID || "");
  const [oldPass, setOldPass] = useState("");
  const [newPass1, setNewPass1] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [highlight, setHighlight] = useState(false);

  const handleClose = () => {
    setOldPass("");
    setNewPass1("");
    setNewPass2("");
    onClose();
  };

  const changeDiscordID = () => {
    updateProfile({ discordID: discordID })
      .then((_response) => {
        displayMessage("Discord details updated", "success");
      })
      .catch((_error) => {
        displayMessage("Unable to update details", "error");
      });
  };

  const updatePassword = () => {
    changePassword({ oldPass, newPass1, newPass2 })
      .then((_response) => {
        displayMessage("Password updated", "success");
      })
      .catch((error) => {
        displayMessage(error.response.data.message[0], "error");
      });
  };

  const discordIDChanged = () => {
    if (!discordID) return false;
    if (discordID === userStatus?.discordID) return false;
    return true;
  };

  const verifyPassword = () => {
    if (!oldPass || oldPass.length < 8) return false;
    if (!newPass1) return false;
    if (newPass1 === newPass2) return true;
  };

  if (!userStatus) return null;

  return (
    <Dialog
      open={open}
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
        Edit profile for {userStatus?.username}
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
          onChange={(e) => setDiscordID(e.target.value.trim())}
          error={discordIDChanged() && !checkDiscordID(discordID)}
          placeholder="Username#1234"
        ></TextField>
        <Button
          sx={{ flexGrow: 1, marginLeft: "0.4em", alignSelf: "stretch" }}
          variant="outlined"
          disabled={!discordIDChanged() || !checkDiscordID(discordID)}
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
        <Box onMouseOver={() => setHighlight(true)} onMouseOut={() => setHighlight(false)}>
          <Button disabled={!verifyPassword()} onClick={updatePassword}>
            Change Password
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
}
