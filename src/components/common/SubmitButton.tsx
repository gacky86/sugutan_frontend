import clsx from "clsx";
type Props = {
  text: string;
  disabled: boolean;
};

const SubmitButton = ({ text, disabled }: Props) => {
  return (
    <button
      type="submit"
      className={clsx(
        disabled
          ? "bg-indigo-300"
          : "bg-indigo-500 duration-300 hover:bg-indigo-600",
        "text-white text-sm h-10 w-full rounded-full"
      )}
      disabled={disabled}
    >
      <p className="text-base">{text}</p>
    </button>
  );
};

export default SubmitButton;

// "bg-indigo-500 duration-300 hover:bg-indigo-600 text-white text-sm h-10 w-full rounded-full"
