"use client";

import { SyntheticEvent } from "react";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Typography, Divider } from "@mui/material";

import MerchantQuickPicks from "./MerchantQuickPicks";

import type { PredefConsumable } from "@/types/items";
import { CustomConsumable } from "./CustomConsumable";

type PropsType = {
  open: boolean;
  onClose: (e: SyntheticEvent) => void;
  addItem: (c: PredefConsumable) => void;
};

export function CreateConsumableDialog(props: PropsType) {
  const { open, onClose, addItem } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add consumable item</DialogTitle>
      <DialogContent>
        <Typography>Quick select</Typography>
        <MerchantQuickPicks addItem={addItem} />
        <Divider sx={{ marginY: "8px" }} />
        <Typography>Add custom item</Typography>
        <CustomConsumable addItem={addItem} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateConsumableDialog;
