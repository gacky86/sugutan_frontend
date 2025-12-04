import AuthLayout from "@/components/layouts/AuthLayout";
import SignUpForm from "@/components/uis/auth/SignUpForm";
import Introduction from "@/components/uis/auth/Introduction";

const SignUp: React.FC = () => {
  return (
    <div>
      <AuthLayout
        childrenIntroduction={<Introduction />}
        childrenForms={<SignUpForm />}
      />
    </div>
  );
};

export default SignUp;
