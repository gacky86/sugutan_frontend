// store/flashcardSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  DictionarySearchResult,
  DictionarySearchResultWithId,
} from "@/types/index";
import { dictionary } from "@/api/gemini";
import { nanoid } from "nanoid";

// gemini APIにユーザーinputを与え、返答を取得する非同期処理
export const getGeminiResults = createAsyncThunk<
  DictionarySearchResultWithId[], // Return type
  string, // Argument (text)
  { rejectValue: string } // Error type when rejecting
>("dictionary/getGeminiResults", async (text, thunkAPI) => {
  try {
    const response = await dictionary(text);

    const geminiResults = response.data as DictionarySearchResult[];

    const withId: DictionarySearchResultWithId[] = geminiResults.map((res) => ({
      ...res,
      id: nanoid(),
    }));

    return withId;
  } catch (error: unknown) {
    console.error("Gemini API error:", error);
    return thunkAPI.rejectWithValue("Failed to fetch Gemini results");
  }
});

interface DictionarySearchState {
  results: DictionarySearchResultWithId[];
  loading: boolean;
  language: "EN" | "FR" | "IT" | "DE";
  regFlashcardTitle: string;
}

const initialState: DictionarySearchState = {
  results: [],
  loading: false,
  language: "EN",
  regFlashcardTitle: "",
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setRegFlashcardTitle: (state, action) => {
      state.regFlashcardTitle = action.payload;
    },
    // 単語帳に登録完了したresultをstateから削除する
    removeResult: (state, action) => {
      state.results = state.results.filter(
        (result) => result.id !== action.payload.id
      );
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

export const { setLanguage, setRegFlashcardTitle, removeResult } =
  dictionarySlice.actions;

export default dictionarySlice.reducer;
