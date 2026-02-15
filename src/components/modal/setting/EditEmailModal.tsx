import ModalTitle from "@/components/uis/common/ModalTitle";

// redux
import { useState } from "react";
import type { EmailParams } from "@/types";
import { signOut, updateEmail } from "@/api/auth";

import { useNavigate } from "react-router-dom";
import EmailInput from "@/components/uis/common/EmailInput";
import PasswordInput from "@/components/uis/common/PasswordInput";
import SubmitButton from "@/components/uis/common/SubmitButton";

const EditEmailModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<{
    lengthCheck: boolean;
    patternCheck: boolean;
    input: string;
  }>({
    lengthCheck: true,
    patternCheck: true,
    input: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    hasError: false,
  });

  const navigate = useNavigate();

  const handleUpdateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params: EmailParams = {
      email: email,
      currentPassword: password.input,
    };
    try {
      await updateEmail(params);
      await signOut();
    } catch (err) {
      setErrorMessage({
        message: err as string,
        hasError: true,
      });
    } finally {
      navigate("/checkemail-edit");
    }
  };

  return (
    <div className="text-center">
      <ModalTitle title="メールアドレス変更" />
      <form onSubmit={handleUpdateEmail}>
        <PasswordInput
          label="パスワード"
          name="currentPassword"
          id="currentPassword"
          setPassword={setPassword}
        />
        <EmailInput
          label="新しいメールアドレス"
          name="email"
          id="email"
          type="text"
          value={email}
          onChange={setEmail}
        />
        <div className="my-6 max-w-[200px] mx-auto">
          <SubmitButton
            text="メールアドレス変更"
            disabled={!password.input || !email}
          />
        </div>
        {errorMessage.hasError && <p>{errorMessage.message}</p>}
      </form>
    </div>
  );
};

export default EditEmailModal;
