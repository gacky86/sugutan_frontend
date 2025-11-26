type Props = {
  text: string;
  disabled: boolean;
};

const DeleteButton = ({ text, disabled }: Props) => {
  return (
    <button
      className="bg-indigo-500 duration-300 hover:bg-indigo-600 text-white text-sm h-10 w-full rounded-full"
      disabled={disabled}
    >
      <p className="text-base">{text}</p>
    </button>
  );
};

export default DeleteButton;
