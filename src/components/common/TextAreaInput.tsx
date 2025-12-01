// func
import { checkText } from "@/utils/checkText";

type Props = {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  maxLength: number;
  text: {
    lengthCheck: boolean;
    input: string;
  };
  setText: (password: { lengthCheck: boolean; input: string }) => void;
};

const TextAreaInput = ({
  label,
  name,
  id,
  placeholder = "",
  maxLength,
  text,
  setText,
}: Props) => {
  return (
    <div className="text-start">
      <label className="block w-full text-gray-400" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="block w-full p-1 border border-gray-300 rounded-md my-1
                duration-300
                hover:border-purple-400 hover:shadow-lg hover:shadow-purple-300/30
                focus:border-purple-400 focus:shadow-lg focus:shadow-purple-300/30"
        name={name}
        id={id}
        placeholder={placeholder}
        value={text.input ?? ""}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setText(checkText(event, maxLength));
        }}
      ></textarea>
      {text.lengthCheck === false && (
        <p className="text-red-600 text-sm">
          {label}の入力文字数は{maxLength}文字以内です
        </p>
      )}
    </div>
  );
};

export default TextAreaInput;
