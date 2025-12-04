import AuthLayout from "@/components/layouts/AuthLayout";
import SignInForm from "@/components/uis/auth/SignInForm";
import Introduction from "@/components/uis/auth/Introduction";

const SignIn: React.FC = () => {
  return (
    <div>
      <AuthLayout
        childrenIntroduction={<Introduction />}
        childrenForms={<SignInForm />}
      />
    </div>
  );
};

export default SignIn;
