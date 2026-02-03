type Props = {
  label: string;
  content: string;
  subContent?: string;
};

const WordInfo = ({ label, content }: Props) => {
  return (
    <div className="flex mb-1 text-gray-600 text-sm">
      <div>
        <p className="min-w-10 whitespace-nowrap mr-3 border-gray-400 border rounded-sm px-1">
          {label}
        </p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default WordInfo;
