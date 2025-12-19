type Props = {
  label: string;
  content: string;
  subContent?: string;
};

const WordInfo = ({ label, content, subContent }: Props) => {
  return (
    <div className="flex mb-1">
      <h4 className="min-w-10 whitespace-nowrap mr-3 text-sm">{label}:</h4>
      <div className="text-sm">
        <p>{content}</p>
        <p>{subContent}</p>
      </div>
    </div>
  );
};

export default WordInfo;
