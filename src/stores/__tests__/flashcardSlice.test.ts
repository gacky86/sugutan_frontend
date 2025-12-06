// tests/store/flashcardSlice.test.ts
import { describe, it, expect, vi } from "vitest";
import type { AxiosResponse } from "axios";
import reducer, {
  addFlashcard,
  removeFlashcard,
  editFlashcard,
  fetchFlashcards,
} from "@/stores/flashcardsSlice";

import { getMyFlashcardList } from "@/api/flashcard";
import type { Flashcard } from "@/types/index";

// API mock
vi.mock("@/api/flashcard", () => ({
  getMyFlashcardList: vi.fn(),
}));

// 初期状態
interface FlashcardState {
  flashcards: Flashcard[];
  loading: boolean;
}
const initialState: FlashcardState = {
  flashcards: [],
  loading: false,
};

describe("flashcardSlice reducers", () => {
  it("addFlashcard should add a flashcard", () => {
    const newFlashcard: Flashcard = {
      id: 1,
      title: "Test Flashcard",
      description: "test",
      language: "EN",
      iconColor: "red",
    };
    const state = reducer(initialState, addFlashcard(newFlashcard));

    expect(state.flashcards).toHaveLength(1);
    expect(state.flashcards[0]).toEqual(newFlashcard);
  });

  it("removeFlashcard should remove a flashcard", () => {
    const testFlashcardA = {
      id: 1,
      title: "Test Flashcard A",
      description: "test A",
      language: "EN",
      iconColor: "red",
    };
    const testFlashcardB = {
      id: 2,
      title: "Test Flashcard B",
      description: "test B",
      language: "EN",
      iconColor: "red",
    };
    const startState = {
      ...initialState,
      flashcards: [testFlashcardA, testFlashcardB],
    };

    const state = reducer(startState, removeFlashcard({ id: 1 }));
    expect(state.flashcards).toHaveLength(1);
    expect(state.flashcards[0]).toEqual(testFlashcardB);
  });

  it("editFlashcard should edit a flashcard", () => {
    const testFlashcardBefore = {
      id: 1,
      title: "Test Flashcard Before",
      description: "test",
      language: "EN",
      iconColor: "red",
    };
    const testFlashcardAfter = {
      id: 1,
      title: "Test Flashcard After",
      description: "test",
      language: "EN",
      iconColor: "red",
    };
    const startState = {
      ...initialState,
      flashcards: [testFlashcardBefore],
    };

    const state = reducer(startState, editFlashcard(testFlashcardAfter));

    expect(state.flashcards[0]).toEqual(testFlashcardAfter);
  });
});

describe("flashcardSlice extraReducers (async thunk)", () => {
  it("pending should set loading=true", () => {
    const action = { type: fetchFlashcards.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it("fulfilled should set flashcards and loading=false", () => {
    const mockData = [{ id: 1, title: "Test" }];

    const action = {
      type: fetchFlashcards.fulfilled.type,
      payload: mockData,
    };

    const state = reducer(initialState, action);

    expect(state.flashcards).toEqual(mockData);
    expect(state.loading).toBe(false);
  });

  it("rejected should set loading=false", () => {
    const action = { type: fetchFlashcards.rejected.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
  });
});

describe("fetchFlashcards async", () => {
  it("dispatching fetchFlashcards should call API and return data", async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          title: "Flashcard 1",
          description: "desc",
          language: "EN",
          iconColor: "red",
        },
      ],
      status: 200,
    } as AxiosResponse<Flashcard[]>;

    // mock関数の戻り値を定義
    (getMyFlashcardList as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    // create async thunkで通常内部的に必要になる値をモック化
    const dispatch = vi.fn();
    const getState = vi.fn();

    const thunk = fetchFlashcards();
    const result = await thunk(dispatch, getState, undefined);

    expect(getMyFlashcardList).toHaveBeenCalled();
    expect(result.payload).toEqual(mockResponse.data);
  });
});
