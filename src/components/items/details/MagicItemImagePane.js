import React from "react";

import { Box } from "@mui/material";

import defaultImage from "../../../media/images/chest-mimic.png";

export default function MagicItemImagePane(props) {
  const { data } = props;

  return (
    <Box sx={{ width: "100%", textAlign: "center", padding: "0.4em" }}>
      <Box
        component="img"
        src={data?.image ?? defaultImage}
        sx={{
          objectFit: "contain",
          height: "15em",
          width: "20em",
        }}
      />
    </Box>
  );
}
