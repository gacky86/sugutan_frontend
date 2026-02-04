import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDueCardProgresses, submitProgress } from "@/api/cardProgress";
import type { CardProgress, Difficulty, Flashcard } from "@/types";

type fetchDueProgressesArds = {
  flashcardId: number;
  mode: "input" | "output";
};

// 本日学習対象のカードと学習記録を取得
export const fetchDueProgresses = createAsyncThunk<
  CardProgress[],
  fetchDueProgressesArds
>("learning/fetchDueProgresses", async ({ flashcardId, mode }, thunkAPI) => {
  try {
    const response = await getDueCardProgresses(flashcardId, mode);

    return response.data as CardProgress[];
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    return thunkAPI.rejectWithValue("Failed to fetch due progress results");
  }
});

// カードの学習記録をユーザー入力とともに記録
export const submitReview = createAsyncThunk(
  "learning/submitReview",
  async (
    {
      progressId,
      difficulty,
    }: {
      progressId: number;
      difficulty: Difficulty;
    },
    thunkAPI,
  ) => {
    try {
      const response = await submitProgress(progressId, difficulty);

      return response.data;
    } catch (error: unknown) {
      console.error("Gemini API error:", error);
      return thunkAPI.rejectWithValue("Failed to submit progress");
    }
  },
);

interface ReviewState {
  queue: CardProgress[];
  currentIndex: number;
  loading: boolean;
  thinking: boolean;
  mode: "input" | "output";
  flashcard: Flashcard | null;
}

const initialState: ReviewState = {
  queue: [],
  currentIndex: 0,
  loading: false,
  thinking: true,
  mode: "input",
  flashcard: null,
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
    setFlashcard(state, action) {
      state.flashcard = action.payload;
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

export const { nextCard, setMode, showAnswer, setFlashcard } =
  learningSlice.actions;
export default learningSlice.reducer;
