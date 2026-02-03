import { describe, it, expect, vi, afterEach } from "vitest";
import type { Mock } from "vitest";
import reducer, {
  setLanguage,
  setRegFlashcardTitle,
  removeResult,
  getGeminiResults,
} from "@/stores/dictionarySlice";
import type {
  DictionarySearchResultWithId,
  DictionarySearchResult,
} from "@/types/index";
import { dictionary } from "@/api/gemini";

// 初期状態
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

// API mock
vi.mock("@/api/gemini", () => ({
  dictionary: vi.fn(),
}));
// nanoidを固定値でmock
vi.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

// reducer 単体テスト
describe("dictionarySlice reducers", () => {
  it("setLanguage should set language", () => {
    // 指定した言語に設定されることを確認する
    const state = reducer(initialState, setLanguage("EN"));
    expect(state.language).toEqual("EN");
  });
  it("setRegFlashcardTitle should set a title to regFlashcardTitle", () => {
    // 指定したタイトルに設定されることを確認する
    const state = reducer(initialState, setRegFlashcardTitle("flashcard"));
    expect(state.regFlashcardTitle).toEqual("flashcard");
  });
  it("removeResult should remove a specified result from results", () => {
    // resultsに複数のresultを格納する
    // idを指定して特定のresultを削除できることを確認する
    const testResultA: DictionarySearchResultWithId = {
      id: "abc",
      translation: { jp: "japaneseA", en: "englishB" },
      example: { jp: "japaneseA", en: "englishB" },
      synonyms: [],
      antonyms: [],
      etymology: "etymology",
      partOfSpeech: "noun",
      collocations: [],
      success: true,
      pronunciation: "pronunciation-abc",
    };
    const testResultB: DictionarySearchResultWithId = {
      id: "def",
      translation: { jp: "japaneseB", en: "englishB" },
      example: { jp: "japaneseB", en: "englishB" },
      synonyms: [],
      antonyms: [],
      etymology: "etymology",
      partOfSpeech: "noun",
      collocations: [],
      success: true,
      pronunciation: "pronunciation-def",
    };
    const startState = {
      ...initialState,
      results: [testResultA, testResultB],
    };
    const state = reducer(startState, removeResult(testResultB));
    expect(state.results[0]).toEqual(testResultA);
  });
});

// ExtraReducer単体テスト
describe("dictionarySlice extraReducers (async thunk)", () => {
  it("pending should set loading=true", () => {
    const action = { type: getGeminiResults.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it("fulfilled should set results and loading=false", () => {
    const testResultA: DictionarySearchResultWithId = {
      id: "abc",
      translation: { jp: "japaneseA", en: "englishB" },
      example: { jp: "japaneseA", en: "englishB" },
      synonyms: [],
      antonyms: [],
      etymology: "etymology",
      partOfSpeech: "noun",
      collocations: [],
      success: true,
      pronunciation: "pronunciation-abc",
    };
    const mockData = [testResultA];

    const action = {
      type: getGeminiResults.fulfilled.type,
      payload: mockData,
    };

    const state = reducer(initialState, action);

    expect(state.results).toEqual(mockData);
    expect(state.loading).toBe(false);
  });

  it("rejected should set loading=false", () => {
    const action = { type: getGeminiResults.rejected.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
  });
});

// AsyncThunk単体テスト
describe("getGeminiResults async", () => {
  it("dispatching getGeminiResults should call API and return data", async () => {
    // create async thunkで通常内部的に必要になる値をモック化
    const dispatch = vi.fn();
    const getState = vi.fn();

    afterEach(() => {
      vi.clearAllMocks();
    });

    // Mock関数の戻り値となるresultsを定義
    const mockResults: DictionarySearchResult[] = [
      {
        translation: { jp: "japaneseA", en: "englishB" },
        example: { jp: "japaneseA", en: "englishB" },
        synonyms: [],
        antonyms: [],
        etymology: "etymology",
        partOfSpeech: "noun",
        collocations: [],
        success: true,
        pronunciation: "pronunciation-abc",
      },
    ];

    // mock関数の戻り値を定義
    // 本来のdictionaryの型をunknownで一度無効化して、vitestのMock関数型にキャストする
    // その上で、dictionary.mockResolvedValueを使って戻り値を定義する
    (dictionary as unknown as Mock).mockResolvedValue({
      data: mockResults,
    });

    const result = await getGeminiResults("test")(
      dispatch,
      getState,
      undefined,
    );
    expect(dictionary).toHaveBeenCalledWith("test");
    expect(result.payload).toEqual<DictionarySearchResultWithId[]>([
      {
        ...mockResults[0],
        id: "test-id",
      },
    ]);
  });

  it("should reject with error message when API call fails", async () => {
    // create async thunkで通常内部的に必要になる値をモック化
    const dispatch = vi.fn();
    const getState = vi.fn();
    // エラー時の戻り値を定義
    (dictionary as unknown as Mock).mockRejectedValue(new Error("API Error"));

    const result = await getGeminiResults("test")(
      dispatch,
      getState,
      undefined,
    );

    expect(dictionary).toHaveBeenCalledWith("test");
    expect(result.type).toBe("dictionary/getGeminiResults/rejected");
    expect(result.payload).toBe("Failed to fetch Gemini results");
  });
});
