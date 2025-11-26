type Props = {
  label: string;
  name: string;
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
};

const EmailInput = ({ label, name, id, type, value, onChange }: Props) => {
  return (
    <div className="text-start">
      <label className="block w-full text-gray-400" htmlFor="email">
        {label}
      </label>
      <input
        className="block w-full h-9 p-1 border border-gray-300 rounded-md my-1
            duration-300
            hover:border-purple-400 hover:shadow-lg hover:shadow-purple-300/30
            focus:border-purple-400 focus:shadow-lg focus:shadow-purple-300/30"
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default EmailInput;
