import type {
  Flashcard,
  Card,
  DictionarySearchResult,
  CardProgress,
  DueCard,
  ExtraNote,
} from "@/types";

export const mockFlashcards: Flashcard[] = [
  {
    id: 0,
    title: "english phrases",
    description: "phrases you can use in daily life",
    language: "EN",
    cardsCount: 100,
    lastReviewedDaysAgo: 1,
  },
  {
    id: 1,
    title: "french words",
    description: "french words in daily life",
    language: "FR",
    cardsCount: 200,
    lastReviewedDaysAgo: 3,
  },
];

export const mockCards: Card[] = [
  {
    id: 101,
    flashcardId: 1,
    front: "りんご",
    back: "apple",
    frontSentence: "私はりんごを食べる。",
    backSentence: "I eat an apple.",
    cardType: "noun",
    pronunciation: "/æpl/",
    explanation: "test",
  },
  {
    id: 102,
    flashcardId: 1,
    front: "飲む",
    back: "take",
    frontSentence: "その薬を毎日飲む。",
    backSentence: "Take the medicine everyday.",
    cardType: "verb",
    pronunciation: "/téɪk/",
    explanation: "test",
  },
];

export const mockDictionaryResults: DictionarySearchResult[] = [
  {
    translation: { jp: "りんご", en: "apple" },
    example: {
      jp: "毎日りんごを食べると医者いらず。",
      en: "An apple a day keeps the doctor away.",
    },
    synonyms: [],
    antonyms: [],
    etymology: "From Old English æppel.",
    partOfSpeech: "noun",
    collocations: [
      "red apple",
      "green apple",
      "apple pie",
      "apple juice",
      "apple tree",
    ],
    success: true,
    pronunciation: "/æpl/",
  },
];

const mockExtraNotes: ExtraNote[] = [
  {
    id: 0,
    cardId: 101,
    noteType: "synonyms",
    content: "fruit",
  },
  {
    id: 1,
    cardId: 101,
    noteType: "antonyms",
    content: "meat",
  },
];
const mockDueCards: DueCard[] = [
  {
    id: 101,
    flashcardId: 1,
    front: "りんご",
    back: "apple",
    frontSentence: "私はりんごを食べる。",
    backSentence: "I eat an apple.",
    cardType: "noun",
    extraNotes: mockExtraNotes,
    pronunciation: "/æpl/",
    explanation: "test apple",
  },
  {
    id: 102,
    flashcardId: 1,
    front: "飲む",
    back: "take",
    frontSentence: "その薬を毎日飲む。",
    backSentence: "Take the medicine everyday.",
    cardType: "verb",
    extraNotes: mockExtraNotes,
    pronunciation: "/téɪk/",
    explanation: "test take",
  },
];
export const mockCardProgresses: CardProgress[] = [
  {
    userId: 1,
    cardId: 1,
    id: 0,
    intervalDays: 1,
    nextReviewAt: "2025-12-4",
    reviewCount: 1,
    easinessFactor: 1,
    lastReviewedAt: "2025-12-3",
    card: mockDueCards[0],
  },
  {
    userId: 1,
    cardId: 1,
    id: 1,
    intervalDays: 3,
    nextReviewAt: "2025-12-7",
    reviewCount: 3,
    easinessFactor: 1,
    lastReviewedAt: "2025-12-2",
    card: mockDueCards[1],
  },
];
