import client from "@/api/client";

// text: geminiAPIに対する具体的な指示
// System_instruction: textに回答する上での前提条件
// 例：geminiTestを参照
const generateSentence = async (systemInstruction: string, text: string) => {
  return client.post("/gemini/generate_sentence", {
    system_instruction: systemInstruction,
    text,
  });
};

export const geminiTest = async () => {
  try {
    const res = await generateSentence(
      "You are a cat. Your name is Neko.",
      "Hello there. Tell me your name."
    );
    // geminiからのレスポンスをJSONにparseする必要がある?
    // const parsedResult = JSON.parse(res.data.result);
    // console.log(parsedResult);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
