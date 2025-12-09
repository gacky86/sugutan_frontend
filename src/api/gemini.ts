import client from "@/api/client";

export const dictionary = (text: string) => {
  return client.post("/gemini/dictionary", { text });
};
