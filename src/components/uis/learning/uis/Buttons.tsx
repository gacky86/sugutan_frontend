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
          className="px-4 py-1 border border-gray-400 bg-white shadow-xl text-black rounded-full text-sm"
          onClick={() => dispatch(showAnswer())}
        >
          Show Answer
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            className="px-4 py-1 border border-gray-400 bg-white shadow-xl text-red-500 rounded-full text-sm"
            onClick={() => submitReviewNextCard("again")}
          >
            Again
          </button>
          <button
            className="px-4 py-1 border border-gray-400 bg-white shadow-xl text-black rounded-full text-sm"
            onClick={() => submitReviewNextCard("hard")}
          >
            Hard
          </button>
          <button
            className="px-4 py-1 border border-gray-400 bg-white shadow-xl text-blue-500 rounded-full text-sm"
            onClick={() => submitReviewNextCard("normal")}
          >
            Normal
          </button>
          <button
            className="px-4 py-1 border border-gray-400 bg-white shadow-xl text-green-700 rounded-full text-sm"
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
