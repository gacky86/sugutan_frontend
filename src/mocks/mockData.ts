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
    explanationFront: "",
    explanationBack: "",
    cardType: "noun",
  },
  {
    id: 102,
    flashcardId: 1,
    front: "飲む",
    back: "take",
    frontSentence: "その薬を毎日飲む。",
    backSentence: "Take the medicine everyday.",
    explanationFront: "",
    explanationBack: "",
    cardType: "verb",
  },
];

export const mockDictionaryResults: DictionarySearchResult[] = [
  {
    translation: { jp: "りんご", en: "apple" },
    definition: {
      jp: "バラ科リンゴ属の落葉高木、およびその果実。世界中で広く栽培され、食用とされる。",
      en: "A common, edible fruit, typically round, with red,…nd crisp, white flesh. It grows on an apple tree.",
    },
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
    explanationFront: "",
    explanationBack: "",
    cardType: "noun",
    extraNotes: mockExtraNotes,
  },
  {
    id: 102,
    flashcardId: 1,
    front: "飲む",
    back: "take",
    frontSentence: "その薬を毎日飲む。",
    backSentence: "Take the medicine everyday.",
    explanationFront: "",
    explanationBack: "",
    cardType: "verb",
    extraNotes: mockExtraNotes,
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
