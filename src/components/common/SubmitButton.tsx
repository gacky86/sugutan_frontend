type Props = {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  text: string;
};

const SubmitButton = ({ handleSubmit, text }: Props) => {
  return (
    <button
      onClick={handleSubmit}
      className="bg-indigo-500 duration-300 hover:bg-indigo-600 text-white text-sm h-10 w-full rounded-full"
    >
      <p className="text-base">{text}</p>
    </button>
  );
};

export default SubmitButton;
