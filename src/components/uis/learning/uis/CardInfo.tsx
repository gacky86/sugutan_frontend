// redux
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/index";
import CardExtraInfo from "./CardExtraInfo";
import CardMainInfo from "./CardMainInfo";

const CardInfo = () => {
  const { queue, currentIndex, thinking } = useSelector(
    (state: RootState) => state.learning
  );

  if (thinking) {
    return null;
  }

  const card = queue[currentIndex].card;
  const extraNotes = queue[currentIndex].card.extraNotes;

  return (
    <>
      <CardMainInfo card={card} />
      <CardExtraInfo extraNotes={extraNotes} />
    </>
  );
};

export default CardInfo;
