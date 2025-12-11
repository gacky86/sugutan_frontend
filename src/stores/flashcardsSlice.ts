// store/flashcardSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyFlashcardList } from "@/api/flashcard";
import type { Flashcard } from "@/types/index";

// ログイン中のユーザーの単語帳リストを取得する非同期処理
export const fetchFlashcards = createAsyncThunk(
  "flashcards/fetchFlashcards",
  async () => {
    const response = await getMyFlashcardList();

    return response.data as Flashcard[];
  }
);

interface FlashcardState {
  flashcards: Flashcard[];
  loading: boolean;
}

const initialState: FlashcardState = {
  flashcards: [],
  loading: false,
};

const flashcardSlice = createSlice({
  name: "flashcards",
  initialState,
  reducers: {
    // 楽観的UIのためのreducer
    addFlashcard: (state, action) => {
      state.flashcards.push(action.payload);
    },
    removeFlashcard: (state, action) => {
      state.flashcards = state.flashcards.filter(
        (fc) => fc.id !== action.payload.id
      );
    },
    editFlashcard: (state, action) => {
      const updated = action.payload;
      const index = state.flashcards.findIndex((fc) => fc.id === updated.id);
      if (index !== -1) {
        state.flashcards[index] = updated;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlashcards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFlashcards.fulfilled, (state, action) => {
        state.flashcards = action.payload;
        state.loading = false;
      })
      .addCase(fetchFlashcards.rejected, (state) => {
        state.loading = false;
      });
    // createAsyncThunkは自動的に上記の３つの状態を生成する
  },
});

export const { addFlashcard, removeFlashcard, editFlashcard } =
  flashcardSlice.actions;
export default flashcardSlice.reducer;
