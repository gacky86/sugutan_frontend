type Props = {
  label: string;
  content: string;
  subContent?: string;
};

const ExtraNoteInfo = ({ label, content }: Props) => {
  return (
    <div className="my-1 text-gray-600 text-sm">
      <h3 className="inline-block min-w-10 whitespace-nowrap mr-3 border-gray-400 border rounded-sm px-1">
        {label}
      </h3>
      <p>{content}</p>
    </div>
  );
};

export default ExtraNoteInfo;
