import type { ExtraNoteInputState, ExtraNoteParams } from "@/types";

export const buildExtraNoteParams = (
  fields: ExtraNoteInputState
): ExtraNoteParams => ({
  noteType: fields.noteType.input,
  content: fields.content.input,
});
