import clsx from "clsx";
type Props = {
  text: string;
  disabled: boolean;
  onClick: () => void;
};

const MainButton = ({ text, disabled, onClick }: Props) => {
  return (
    <button
      className={clsx(
        disabled
          ? "border-gray-500 text-gray-500"
          : "border-indigo-500 text-indigo-500 duration-300 hover:shadow-lg",
        "text-sm h-10 w-full min-w-[200px] rounded-lg border my-2"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <p className="text-base">{text}</p>
    </button>
  );
};

export default MainButton;
