import { useRouter } from "next/navigation";

import { Chip } from "@mui/material";

import type { PartyMember } from "@/types/events";

type PropsType = {
  data: PartyMember;
  onClick: () => void;
};

export function PartyMember(props: PropsType) {
  const { data, onClick } = props;

  const router = useRouter();

  const handleClick = () => {
    onClick();
    router.push(`/character/${data.uuid}`);
  };

  return <Chip label={data.name} onClick={handleClick} />;
}

export default PartyMember;
