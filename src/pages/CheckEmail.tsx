import AuthLayout from "@/components/layouts/AuthLayout";
import CheckEmailMessage from "@/components/auth/CheckEmailMessage";
import Introduction from "@/components/auth/Introduction";

const CheckEmail = () => {
  return (
    <div>
      <AuthLayout
        childrenIntroduction={<Introduction />}
        childrenForms={<CheckEmailMessage />}
      />
    </div>
  );
};

export default CheckEmail;
