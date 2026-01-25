import { useState } from "react";
// func
import { checkPassword } from "@/utils/checkPassword";
// React icons
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

type Props = {
  label: string;
  name: string;
  id: string;
  setPassword: (password: {
    lengthCheck: boolean;
    patternCheck: boolean;
    input: string;
  }) => void;
};

const PasswordInput = ({ label, name, id, setPassword }: Props) => {
  // フォームにパスワードの入力内容を見せるか隠すかのstate
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="text-start">
      <label className="block w-full text-gray-400" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className="block w-full h-9 p-1 border border-gray-300 rounded-md my-1
            duration-300
            hover:border-purple-400 hover:shadow-lg hover:shadow-purple-300/30
            focus:border-purple-400 focus:shadow-lg focus:shadow-purple-300/30"
          type={showPassword ? "text" : "password"}
          name={name}
          id={id}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(checkPassword(event));
          }}
        />
        {/* パスワードvisibility ボタン */}
        <button
          className="absolute top-2 right-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
