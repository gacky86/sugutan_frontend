// components
import TextAreaInput from "@/components/common/TextAreaInput";
import SelectInput from "@/components/common/SelectInput";
import type { ExtraNoteInputState, FieldState } from "@/types";
import { extraNoteTypes } from "@/types/index";

type Props = {
  fields: ExtraNoteInputState;
  updateField: (name: keyof ExtraNoteInputState, value: FieldState) => void;
};

const ExtraNoteInputForm = ({ fields, updateField }: Props) => {
  return (
    <>
      <SelectInput
        label="Note type"
        name="noteType"
        id="noteType"
        options={extraNoteTypes}
        text={fields.noteType}
        setText={(val) => updateField("noteType", val)}
      />
      <TextAreaInput
        label="Content"
        name="content"
        id="content"
        placeholder="単語・表現を使った例文を入力（日本語）"
        maxLength={256}
        text={fields.content}
        setText={(val) => updateField("content", val)}
      />
    </>
  );
};

export default ExtraNoteInputForm;
