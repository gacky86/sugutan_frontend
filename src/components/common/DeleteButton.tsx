type Props = {
  text: string;
  handleDelete: () => void;
  disabled: boolean;
};

const DeleteButton = ({ text, handleDelete, disabled }: Props) => {
  return (
    <button
      className="bg-white border border-red-600 duration-300 hover:shadow-xl text-red-600 text-sm h-10 w-full rounded-full"
      onClick={handleDelete}
      disabled={disabled}
    >
      <p className="text-base">{text}</p>
    </button>
  );
};

export default DeleteButton;
