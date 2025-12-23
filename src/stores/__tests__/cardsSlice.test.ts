import { describe, it, expect, vi } from "vitest";
import type { AxiosResponse } from "axios";
import reducer, {
  addCard,
  removeCard,
  editCard,
  fetchCards,
} from "@/stores/cardsSlice";
import type { Card } from "@/types/index";
import { getCardList } from "@/api/card";

// 初期状態
interface CardState {
  cards: Card[];
  loading: boolean;
}
const initialState: CardState = {
  cards: [],
  loading: false,
};

// API mock
vi.mock("@/api/card", () => ({
  getCardList: vi.fn(),
}));

// reducer 単体テスト
describe("cardsSlice reducers", () => {
  it("addCard should add a card", () => {
    // 新規のカードを用意して、こいつに食わせて、stateに加わっていることをexpectする
    const newCard: Card = {
      id: 1,
      flashcardId: 1,
      front: "test",
      back: "test",
      frontSentence: "test",
      backSentence: "test",
      explanationFront: "test",
      explanationBack: "test",
      cardType: "test",
    };
    const state = reducer(initialState, addCard(newCard));

    expect(state.cards).toHaveLength(1);
    expect(state.cards[0]).toEqual(newCard);
  });
  it("removeCard should remove a card", () => {
    // カードを二つ用意して、stateにsetしておいて、これを実行して、stateからremove
    // されていることをexpectする
    const cardA: Card = {
      id: 1,
      flashcardId: 1,
      front: "testA",
      back: "testA",
      frontSentence: "testA",
      backSentence: "testA",
      explanationFront: "testA",
      explanationBack: "testA",
      cardType: "testA",
    };
    const cardB: Card = {
      id: 2,
      flashcardId: 1,
      front: "testB",
      back: "testB",
      frontSentence: "testB",
      backSentence: "testB",
      explanationFront: "testB",
      explanationBack: "testB",
      cardType: "testB",
    };
    const startState = {
      ...initialState,
      cards: [cardA, cardB],
    };

    const state = reducer(startState, removeCard({ id: 1 }));
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0]).toEqual(cardB);
  });

  it("editCard should edit a card", () => {
    // カードを一つ用意して、stateにsetしておいて、これを実行して、stateが変化後のcard に
    // なっていることをexpect
    const cardBefore: Card = {
      id: 1,
      flashcardId: 1,
      front: "testBefore",
      back: "testBefore",
      frontSentence: "testBefore",
      backSentence: "testBefore",
      explanationFront: "testBefore",
      explanationBack: "testBefore",
      cardType: "testBefore",
    };
    const cardAfter: Card = {
      id: 1,
      flashcardId: 1,
      front: "testAfter",
      back: "testAfter",
      frontSentence: "testAfter",
      backSentence: "testAfter",
      explanationFront: "testAfter",
      explanationBack: "testAfter",
      cardType: "testAfter",
    };
    const startState = {
      ...initialState,
      cards: [cardBefore],
    };
    const state = reducer(startState, editCard(cardAfter));
    expect(state.cards[0]).toEqual(cardAfter);
  });
});

// ExtraReducer単体テスト
describe("cardsSlice extraReducers (async thunk)", () => {
  it("pending should set loading=true", () => {
    const action = { type: fetchCards.pending.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it("fulfilled should set flashcards and loading=false", () => {
    const mockData = [{ id: 1, title: "Test" }];

    const action = {
      type: fetchCards.fulfilled.type,
      payload: mockData,
    };

    const state = reducer(initialState, action);

    expect(state.cards).toEqual(mockData);
    expect(state.loading).toBe(false);
  });

  it("rejected should set loading=false", () => {
    const action = { type: fetchCards.rejected.type };
    const state = reducer(initialState, action);

    expect(state.loading).toBe(false);
  });
});

// AsyncThunk単体テスト
describe("fetchFlashcards async", () => {
  it("dispatching fetchFlashcards should call API and return data", async () => {
    const mockResponse = {
      data: [
        {
          id: 1,
          flashcardId: 1,
          front: "test",
          back: "test",
          frontSentence: "test",
          backSentence: "test",
          explanationFront: "test",
          explanationBack: "test",
          cardType: "test",
        },
      ],
      status: 200,
    } as AxiosResponse<Card[]>;

    // mock関数の戻り値を定義
    (getCardList as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse
    );

    // create async thunkで通常内部的に必要になる値をモック化
    const dispatch = vi.fn();
    const getState = vi.fn();

    const thunk = fetchCards(1);
    const result = await thunk(dispatch, getState, undefined);

    expect(getCardList).toHaveBeenCalled();
    expect(result.payload).toEqual(mockResponse.data);
  });
});
