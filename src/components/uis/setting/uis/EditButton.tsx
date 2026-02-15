type Props = {
  ariaLabel: string;
  onClick: () => void;
};

const EditButton = ({ ariaLabel, onClick }: Props) => {
  return (
    <div
      className="border border-gray-600 rounded-sm text-sm px-1 hover:shadow-xl hover:shadow-gray-400/30 duration-300 cursor-pointer"
      role="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <p>変更</p>
    </div>
  );
};

export default EditButton;
