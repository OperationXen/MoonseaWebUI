import { useLayoutEffect, useState } from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { TextField } from "@mui/material";

export default function RewardSelectWidget(props) {
  const { value, setValue, rewards } = props;
  const [textVal, setTextVal] = useState("");

  // reset value on component load
  useLayoutEffect(() => {
    setValue(0);
  }, [setValue]);

  if (!rewards || typeof rewards === "string") {
    return (
      <TextField
        label="Reward"
        sx={{ width: "20em" }}
        value={textVal}
        onChange={(e) => setTextVal(e.target.value)}
        placeholder={rewards}
      ></TextField>
    );
  } else {
    return (
      <FormControl>
        <InputLabel>Magic Item Reward</InputLabel>
        <Select
          sx={{ width: "20em", justifySelf: "flex-start" }}
          label="Magic Item Reward"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={rewards.length === 1}
        >
          {rewards.map((reward, index) => {
            return <MenuItem value={index}>{reward}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  }
}
