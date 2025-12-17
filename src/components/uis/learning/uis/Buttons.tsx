import type { AppDispatch } from "@/stores";
import { nextCard, showAnswer, submitReview } from "@/stores/learningSlice";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/stores/index";
import type { Difficulty } from "@/types";

const Buttons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { queue, currentIndex, thinking } = useSelector(
    (state: RootState) => state.learning
  );
  const submitReviewNextCard = (difficulty: Difficulty) => {
    dispatch(submitReview({ progressId: queue[currentIndex].id, difficulty }));
    dispatch(nextCard());
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
      {thinking ? (
        <button
          className="px-6 py-2 bg-green-500 text-white rounded"
          onClick={() => dispatch(showAnswer())}
        >
          Show Answer
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            className="px-6 py-2 bg-green-500 text-white rounded"
            onClick={() => submitReviewNextCard("again")}
          >
            Again
          </button>
          <button
            className="px-6 py-2 bg-green-500 text-white rounded"
            onClick={() => submitReviewNextCard("hard")}
          >
            Hard
          </button>
          <button
            className="px-6 py-2 bg-green-500 text-white rounded"
            onClick={() => submitReviewNextCard("normal")}
          >
            Normal
          </button>
          <button
            className="px-6 py-2 bg-green-500 text-white rounded"
            onClick={() => submitReviewNextCard("easy")}
          >
            Easy
          </button>
        </div>
      )}
    </div>
  );
};

export default Buttons;
