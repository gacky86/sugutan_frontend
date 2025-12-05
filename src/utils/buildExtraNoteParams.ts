import type { ExtraNoteInputState, ExtraNoteParams } from "@/types";
// フォームの入力値をAPI payload用に編集する
export const buildExtraNoteParams = (
  fields: ExtraNoteInputState
): ExtraNoteParams => ({
  noteType: fields.noteType.input,
  content: fields.content.input,
});
