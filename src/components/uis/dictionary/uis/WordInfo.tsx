type Props = {
  label: string;
  content: string;
  subContent?: string;
};

const WordInfo = ({ label, content, subContent }: Props) => {
  return (
    <div className="flex mb-1">
      <h4 className="min-w-10 whitespace-nowrap">{label}:</h4>
      <div>
        <p>{content}</p>
        <p>{subContent}</p>
      </div>
    </div>
  );
};

export default WordInfo;
