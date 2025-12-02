// components
import TextAreaInput from "@/components/common/TextAreaInput";
import SelectInput from "@/components/common/SelectInput";
import type { ExtraNoteInputState, FieldState } from "@/types";
import { extraNoteTypes } from "@/types/index";
import { RiDeleteBin6Line } from "react-icons/ri";

type Props = {
  fields: ExtraNoteInputState;
  index: number;
  updateField: (
    index: number,
    name: keyof ExtraNoteInputState,
    value: FieldState
  ) => void;
  removeNote: () => void;
};

const ExtraNoteInputForm = ({
  fields,
  index,
  updateField,
  removeNote,
}: Props) => {
  return (
    <div className="border border-gray-500 rounded-lg p-3 mb-3 shadow-lg">
      <SelectInput
        label="Note type"
        name="noteType"
        id={`noteType_${index}`}
        options={extraNoteTypes}
        text={fields.noteType}
        setText={(val) => updateField(index, "noteType", val)}
      />
      <TextAreaInput
        label="Content"
        name="content"
        id={`content_${index}`}
        placeholder="単語・表現を使った例文を入力（日本語）"
        maxLength={256}
        text={fields.content}
        setText={(val) => updateField(index, "content", val)}
      />
      <div className="text-2xl text-gray-500 flex justify-end">
        <RiDeleteBin6Line onClick={removeNote} />
      </div>
    </div>
  );
};

export default ExtraNoteInputForm;
