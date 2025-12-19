type Props = {
  label: string;
  content: string;
};

const ExtraInfoContent = ({ label, content }: Props) => {
  return (
    <div className="mb-2">
      <h4 className="text-gray-500">{label}</h4>
      <div>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default ExtraInfoContent;
