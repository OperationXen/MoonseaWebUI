import { useCallback } from "react";

import { Autocomplete, TextField } from "@mui/material";

import _classes from "@/config/classes.json";
import type { ClassOptions } from "@/types/classes";

type PropsType = {
  mainClass: string;
  value: string;
  onChange: (newVal: string) => void;
  sx?: object;
};

export function SubclassPicker(props: PropsType) {
  const { mainClass, value, onChange, sx } = props;

  const classOptions = _classes as ClassOptions[];
  const getValidSubclasses = useCallback((className: string) => {
    if (!className) return [];

    let temp = classOptions.filter((item) => {
      return item.name === className;
    });
    return temp[0].subclasses;
  }, []);

  return (
    <Autocomplete
      sx={sx}
      freeSolo
      value={value}
      onChange={(_e, newVal) => onChange(newVal || "")}
      inputValue={value}
      onInputChange={(_e, newVal) => onChange(newVal)}
      renderInput={(params) => <TextField {...params} label="Subclass" />}
      options={getValidSubclasses(mainClass)}
    />
  );
}

export default SubclassPicker;
