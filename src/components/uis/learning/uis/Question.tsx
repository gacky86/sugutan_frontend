import { useSelector } from "react-redux";
import type { RootState } from "@/stores/index";
import { handleSpeak } from "@/utils/handleSpeak";
import { HiSpeakerWave } from "react-icons/hi2";

const Question = () => {
  const { queue, currentIndex, mode, loading } = useSelector(
    (state: RootState) => state.learning,
  );
  if (loading || !queue[currentIndex]) {
    return null;
  }
  const card = queue[currentIndex].card;
  return (
    <div className="m-auto text-center  py-3">
      <p>{mode === "input" ? card.backSentence : card.frontSentence}</p>
      {mode === "input" && (
        <HiSpeakerWave
          onClick={() => handleSpeak(card.backSentence)}
          className="mx-auto cursor-pointer mt-3"
        />
      )}
    </div>
  );
};

export default Question;
