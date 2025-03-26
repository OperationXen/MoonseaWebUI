import type { DMRewardEvent } from "@/types/events";

type PropsType = {
  event: DMRewardEvent;
  onClose: () => void;
};

export function DMEventReward(props: PropsType) {
  const { event, onClose } = props;

  return null;
}

export default DMEventReward;
