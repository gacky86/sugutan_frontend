// components
import TextInput from "@/components/uis/common/TextInput";
import TextAreaInput from "@/components/uis/common/TextAreaInput";
import SelectInput from "@/components/uis/common/SelectInput";
import type { CardInputState, FieldState } from "@/types";
import { cardTypes } from "@/types/index";

type Props = {
  fields: CardInputState;
  updateField: (name: keyof CardInputState, value: FieldState) => void;
};

const CardsInputForm = ({ fields, updateField }: Props) => {
  return (
    <>
      <TextInput
        label="Japanese"
        name="front"
        id="front"
        placeholder="単語・表現の日本語を入力"
        maxLength={60}
        text={fields.front}
        setText={(val) => updateField("front", val)}
      />
      <TextInput
        label="English"
        name="back"
        id="back"
        placeholder="単語・表現の英語を入力"
        maxLength={60}
        text={fields.back}
        setText={(val) => updateField("back", val)}
      />
      <SelectInput
        label="Card type"
        name="cardType"
        id="cardType"
        options={cardTypes}
        text={fields.cardType}
        setText={(val) => updateField("cardType", val)}
      />
      <TextAreaInput
        label="Japanese sentence"
        name="frontSentence"
        id="frontSentence"
        placeholder="単語・表現を使った例文を入力（日本語）"
        maxLength={256}
        text={fields.frontSentence}
        setText={(val) => updateField("frontSentence", val)}
      />
      <TextAreaInput
        label="English sentence"
        name="backSentence"
        id="backSentence"
        placeholder="単語・表現を使った例文を入力（英語）"
        maxLength={256}
        text={fields.backSentence}
        setText={(val) => updateField("backSentence", val)}
      />
      <div className="border-t border-gray-300 mt-8 mb-6 relative">
        <p className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-gray-500">
          Additional Info
        </p>
      </div>
      <TextAreaInput
        label="Explanation"
        name="explanation"
        id="explanation"
        placeholder="単語・表現の意味やニュアンスなど"
        maxLength={256}
        text={fields.explanation}
        setText={(val) => updateField("explanation", val)}
      />
      <TextInput
        label="Pronunciation"
        name="pronunciation"
        id="pronunciation"
        placeholder="発音記号などを入力"
        maxLength={256}
        text={fields.pronunciation}
        setText={(val) => updateField("pronunciation", val)}
      />
    </>
  );
};

export default CardsInputForm;
