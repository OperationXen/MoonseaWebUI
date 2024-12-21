import AssignmentIcon from "@mui/icons-material/Assignment";

import { IconButton, Tooltip } from "@mui/material";

type PropsType = {
  setOpen: () => void;
};

export function BiographyControlButton(props: PropsType) {
  const { setOpen } = props;

  return (
    <Tooltip title="Character biography" placement="left" arrow>
      <IconButton onClick={setOpen}>
        <AssignmentIcon />
      </IconButton>
    </Tooltip>
  );
}

export default BiographyControlButton;
