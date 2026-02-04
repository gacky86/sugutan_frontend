import { FaBook } from "react-icons/fa";

// components
import PageTitle from "@/components/uis/common/PageTitle";
import Answer from "@/components/uis/learning/uis/Answer";
import Question from "@/components/uis/learning/uis/Question";
import CardInfo from "@/components/uis/learning/uis/CardInfo";
import Buttons from "@/components/uis/learning/uis/Buttons";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/stores/index";
import LoadingOverlay from "@/components/uis/common/LoadingOverLay";
import { useEffect } from "react";
import { fetchDueProgresses } from "@/stores/learningSlice";
import MainButton from "../common/MainButton";
import { useNavigate } from "react-router-dom";

const LearningContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { queue, currentIndex, loading, mode, flashcardTitle } = useSelector(
    (state: RootState) => state.learning,
  );

  useEffect(() => {
    dispatch(fetchDueProgresses(mode));
  }, [dispatch, mode]);

  const navigate = useNavigate();

  return (
    <div className="relative h-full">
      <PageTitle text={flashcardTitle} icon={FaBook} />
      <div className="p-5">
        {queue.length > currentIndex ? (
          <>
            <Question />
            <Answer />
            <div className="max-h-[60vh] overflow-y-auto block">
              <CardInfo />
            </div>
            <Buttons />
          </>
        ) : (
          <div className="m-auto text-center  py-3">
            <h2>おめでとう！本日分の学習は完了しました。</h2>
            <div className="inline-block">
              <MainButton
                text="戻る"
                disabled={false}
                onClick={() => navigate("/")}
              />
            </div>
          </div>
        )}
      </div>
      <LoadingOverlay isLoadingOverlay={loading} />
    </div>
  );
};

export default LearningContent;
