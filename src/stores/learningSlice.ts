import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDueCardProgresses, submitProgress } from "@/api/cardProgress";
import type { CardProgress, Difficulty } from "@/types";

// 本日学習対象のカードと学習記録を取得
export const fetchDueProgresses = createAsyncThunk(
  "learning/fetchDueProgresses",
  async (mode: "input" | "output") => {
    const response = await getDueCardProgresses(mode);
    console.log(response);

    return response.data as CardProgress[];
  }
);

// カードの学習記録をユーザー入力とともに記録
export const submitReview = createAsyncThunk(
  "learning/submitReview",
  async ({
    progressId,
    difficulty,
  }: {
    progressId: number;
    difficulty: Difficulty;
  }) => {
    const response = await submitProgress(progressId, difficulty);
    return response.data;
  }
);

interface ReviewState {
  queue: CardProgress[];
  currentIndex: number;
  loading: boolean;
  thinking: boolean;
  mode: "input" | "output";
}

const initialState: ReviewState = {
  queue: [],
  currentIndex: 0,
  loading: false,
  thinking: true,
  mode: "input",
};

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    nextCard(state) {
      state.currentIndex += 1;
      state.thinking = true;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    showAnswer(state) {
      state.thinking = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDueProgresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDueProgresses.fulfilled, (state, action) => {
        state.queue = action.payload;
        state.currentIndex = 0;
        state.loading = false;
      });
  },
});

export const { nextCard, setMode, showAnswer } = learningSlice.actions;
export default learningSlice.reducer;
