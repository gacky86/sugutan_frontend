import { signOut } from "@/api/auth";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate();
  const handleSigngOut = async () => {
    try {
      await signOut();
    } finally {
      navigate("/signin");
    }
  };
  return (
    <div
      className="md:text-xl md:flex md:items-center md:gap-2 md:py-3 md:rounded-lg cursor-pointer duration-300 hover:bg-orange-50"
      onClick={() => handleSigngOut()}
    >
      <BiLogOut />
      <p className="hidden md:inline">ログアウト</p>
    </div>
  );
};

export default SignOutButton;
