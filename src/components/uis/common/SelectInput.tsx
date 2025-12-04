type SelectInputProps = {
  label: string;
  name: string;
  id: string;
  options: string[];
  text: {
    lengthCheck: boolean;
    input: string;
  };
  setText: (val: { lengthCheck: boolean; input: string }) => void;
};

const SelectInput = ({
  label,
  name,
  id,
  options,
  text,
  setText,
}: SelectInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1 text-gray-400"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={text.input}
        onChange={(e) => setText({ lengthCheck: true, input: e.target.value })}
        className="w-full border border-gray-300 rounded p-2 duration-300
            hover:border-purple-400 hover:shadow-lg hover:shadow-purple-300/30
            focus:border-purple-400 focus:shadow-lg focus:shadow-purple-300/30"
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
