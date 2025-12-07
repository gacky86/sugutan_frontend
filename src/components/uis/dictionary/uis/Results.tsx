import WordInfo from "@/components/uis/dictionary/uis/WordInfo";
import { FaBook } from "react-icons/fa";

const Results = () => {
  return (
    <div className="border-gray-400 border rounded-lg flex flex-col shadow-lg px-2 py-1 mb-4">
      <h2 className="text-xl mb-1 pb-1 border-b border-gray-500">
        [動句] tread water = 立ち泳ぎする
      </h2>
      <div className="flex justify-between ">
        <div className="">
          <WordInfo />
          <WordInfo />
        </div>
        <div className="text-2xl">
          <FaBook />
        </div>
      </div>
    </div>
  );
};

export default Results;
