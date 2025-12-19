import { useSelector } from "react-redux";
import type { RootState } from "@/stores/index";

const Answer = () => {
  const { queue, currentIndex, mode, thinking } = useSelector(
    (state: RootState) => state.learning
  );
  if (thinking) {
    return null;
  }
  const card = queue[currentIndex].card;
  return (
    <div className="mx-auto mb-6 text-center  py-3 border-t border-gray-400">
      <p>{mode === "input" ? card.frontSentence : card.backSentence}</p>
    </div>
  );
};

export default Answer;
