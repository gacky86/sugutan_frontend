import type { CardProgress, Flashcard, SubmitedProgresss } from "@/types";
import { describe, it, expect, vi, afterEach } from "vitest";
import type { Mock } from "vitest";

import reducer, {
  nextCard,
  setMode,
  showAnswer,
  fetchDueProgresses,
  submitReview,
} from "@/stores/learningSlice";
import { getDueCardProgresses, submitProgress } from "@/api/cardProgress";
import { mockFlashcards } from "@/mocks/mockData";

// 初期状態
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

// reducerの単体テスト
describe("learningSlice reducers", () => {
  it("nextCard should increment index and turn thinking into true", () => {
    // 初期値からcurrentIndex++, thinking==trueとなることを確認
    const state = reducer(initialState, nextCard());

    expect(state.currentIndex).toEqual(1);
    expect(state.thinking).toEqual(true);
  });
  it("setMode should set a mode into specified mode", () => {
    const state = reducer(initialState, setMode("output"));

    expect(state.mode).toEqual("output");
  });
  it("showAnswer should turn thinking into false", () => {
    const state = reducer(initialState, showAnswer());

    expect(state.thinking).toEqual(false);
  });
});

// Extra Reducerの単体テスト
describe("learningSlice extraReducers (async thunk)", () => {
  it("pending should set loading=true", () => {
    const action = { type: fetchDueProgresses.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it("fulfilled should set queue, loading=false and currentIndex=0", () => {
    // 戻り値の定義。card以下の構造は省略。
    const testResult = [
      {
        userId: 1,
        cardId: 1,
        id: 1,
        intervalDays: 1,
        nextReviewAt: "2025-12-4",
        reviewCount: 1,
        easinessFactor: 1,
        lastReviewedAt: "2025-12-3",
        card: {} as unknown,
      },
    ] as CardProgress[];
    // const mockData = [testResult];

    const action = {
      type: fetchDueProgresses.fulfilled.type,
      payload: testResult,
    };

    const state = reducer(initialState, action);

    expect(state.queue).toEqual(testResult);
    expect(state.loading).toBe(false);
    expect(state.currentIndex).toBe(0);
  });

  it("rejected should set loading=false", () => {
    const action = { type: fetchDueProgresses.rejected.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
  });
});

// API mock
vi.mock("@/api/cardProgress", () => ({
  getDueCardProgresses: vi.fn(),
  submitProgress: vi.fn(),
}));

// Async Thunkの単体テスト(fetchDueProgresses)
describe("fetchDueProgresses async", () => {
  it("dispatching fetchDueProgresses should call API and return data", async () => {
    // create async thunkで通常内部的に必要になる値をモック化
    const dispatch = vi.fn();
    const getState = vi.fn();

    afterEach(() => {
      vi.clearAllMocks();
    });

    // Mock関数の戻り値となるresultsを定義
    const testResult = [
      {
        userId: 1,
        cardId: 1,
        id: 1,
        intervalDays: 1,
        nextReviewAt: "2025-12-4",
        reviewCount: 1,
        easinessFactor: 1,
        lastReviewedAt: "2025-12-3",
        card: {} as unknown,
      },
    ] as CardProgress[];

    // mock関数の戻り値を定義
    // 本来のdictionaryの型をunknownで一度無効化して、vitestのMock関数型にキャストする
    // その上で、getDueCardProgresses.mockResolvedValueを使って戻り値を定義する
    (getDueCardProgresses as unknown as Mock).mockResolvedValue({
      data: testResult,
    });

    // thunk関数の呼び出し
    const result = await fetchDueProgresses({
      flashcardId: mockFlashcards[0].id,
      mode: "input",
    })(dispatch, getState, undefined);
    expect(getDueCardProgresses).toHaveBeenCalledWith(0, "input");
    expect(result.payload).toEqual<CardProgress[]>([
      {
        ...testResult[0],
      },
    ]);
  });

  it("should reject with error message when API call fails", async () => {
    // create async thunkで通常内部的に必要になる値をモック化
    const dispatch = vi.fn();
    const getState = vi.fn();
    // エラー時の戻り値を定義
    (getDueCardProgresses as unknown as Mock).mockRejectedValue(
      new Error("API Error"),
    );

    const result = await fetchDueProgresses({
      flashcardId: mockFlashcards[0].id,
      mode: "input",
    })(dispatch, getState, undefined);

    expect(getDueCardProgresses).toHaveBeenCalledWith(0, "input");
    expect(result.type).toBe("learning/fetchDueProgresses/rejected");
    expect(result.payload).toBe("Failed to fetch due progress results");
  });
});

// Async Thunkの単体テスト(submitReview)
describe("submitReview async", () => {
  it("dispatching submitReview should call API", async () => {
    // create async thunkで通常内部的に必要になる値をモック化
    const dispatch = vi.fn();
    const getState = vi.fn();

    afterEach(() => {
      vi.clearAllMocks();
    });

    const submitedProgresss: SubmitedProgresss = {
      userId: 1,
      cardId: 1,
      id: 1,
      intervalDays: 1,
      nextReviewAt: "2025-12-4",
      reviewCount: 1,
      easinessFactor: 1,
      lastReviewedAt: "2025-12-3",
      mode: "input",
    };

    (submitProgress as unknown as Mock).mockResolvedValue({
      data: submitedProgresss,
    });

    // thunk関数の呼び出し
    const result = await submitReview({ progressId: 1, difficulty: "hard" })(
      dispatch,
      getState,
      undefined,
    );
    expect(submitProgress).toHaveBeenCalledWith(1, "hard");
    expect(result.payload).toEqual<SubmitedProgresss>(submitedProgresss);
  });

  it("should reject with error message when API call fails", async () => {
    // create async thunkで通常内部的に必要になる値をモック化
    const dispatch = vi.fn();
    const getState = vi.fn();
    // エラー時の戻り値を定義
    (submitProgress as unknown as Mock).mockRejectedValue(
      new Error("API Error"),
    );

    const result = await submitReview({ progressId: 1, difficulty: "hard" })(
      dispatch,
      getState,
      undefined,
    );

    expect(submitProgress).toHaveBeenCalledWith(1, "hard");
    expect(result.type).toBe("learning/submitReview/rejected");
    expect(result.payload).toBe("Failed to submit progress");
  });
});
