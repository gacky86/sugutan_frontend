import { useSelector } from "react-redux";
import type { RootState } from "@/stores/index";

const Question = () => {
  const { queue, currentIndex, mode, loading } = useSelector(
    (state: RootState) => state.learning
  );
  if (loading || !queue[currentIndex]) {
    return null;
  }
  const card = queue[currentIndex].card;
  return (
    <div className="m-auto text-center  py-3">
      <p>{mode === "input" ? card.backSentence : card.frontSentence}</p>
    </div>
  );
};

export default Question;
