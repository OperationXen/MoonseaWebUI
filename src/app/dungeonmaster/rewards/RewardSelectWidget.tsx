import { useLayoutEffect } from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { TextField } from "@mui/material";

type PropsType = {
  value: number;
  setValue: (newVal: number) => void;
  text: string;
  setText: (newVal: string) => void;
  rewards: string | string[];
};

export default function RewardSelectWidget(props: PropsType) {
  const { value, setValue, rewards } = props;
  const { text, setText } = props;

  // reset value on component load
  useLayoutEffect(() => {
    setValue(0);
  }, [setValue]);

  if (!rewards || typeof rewards === "string") {
    return (
      <TextField
        label="Reward"
        sx={{ width: "20em" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
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
          onChange={(e) => setValue(e.target.value as number)}
          disabled={rewards.length === 1}
        >
          {rewards.map((reward, index) => {
            return (
              <MenuItem key={`${index}-${reward}`} value={index}>
                {reward}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}
