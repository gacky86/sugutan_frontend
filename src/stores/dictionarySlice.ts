// store/flashcardSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { DictionarySearchResult } from "@/types/index";
import { dictionary } from "@/api/gemini";

// ログイン中のユーザーの単語帳リストを取得する非同期処理
export const getGeminiResults = createAsyncThunk(
  "dictionary/getGeminiResults",
  async (text: string) => {
    const response = await dictionary(text);
    console.log(response);

    return response.data as DictionarySearchResult[];
  }
);

interface DictionarySearchState {
  results: DictionarySearchResult[];
  loading: boolean;
  language: "EN" | "FR" | "IT" | "DE";
}

const initialState: DictionarySearchState = {
  results: [],
  loading: false,
  language: "EN",
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGeminiResults.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGeminiResults.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(getGeminiResults.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const setLanguage = dictionarySlice.actions;

export default dictionarySlice.reducer;
