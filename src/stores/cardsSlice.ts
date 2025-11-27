import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCardList } from "@/api/card";
import type { Card } from "@/types/index";

// 単語帳に属するカードを取得する非同期処理
export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (flashcardId: number) => {
    const response = await getCardList(flashcardId);
    return response.data as Card[];
  }
);

interface CardState {
  cards: Card[];
  loading: boolean;
}

const initialState: CardState = {
  cards: [],
  loading: false,
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // 楽観的UIのためのreducer
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter((c) => c.id !== action.payload.id);
    },
    editCard: (state, action) => {
      const updated = action.payload;
      const index = state.cards.findIndex((c) => c.id === updated.id);
      if (index !== -1) {
        state.cards[index] = updated;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.loading = false;
      })
      .addCase(fetchCards.rejected, (state) => {
        state.loading = false;
      });
    // createAsyncThunkは自動的に上記の３つの状態を生成する
  },
});

export const { addCard, removeCard, editCard } = cardSlice.actions;
export default cardSlice.reducer;
