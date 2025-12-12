import { useSelector } from "react-redux";
import type { RootState } from "@/stores/index";
import ResultCard from "@/components/uis/dictionary/uis/ResultCard";

const Results = () => {
  const results = useSelector((state: RootState) => state.dictionary.results);

  if (results.length === 0) {
    return <p>検索結果はありません</p>;
  }
  if (!results[0].success) {
    return (
      <h2 className="m-auto">該当する単語・表現が見つかりませんでした。</h2>
    );
  }

  return (
    <div>
      {results.map((result, key) => {
        return <ResultCard key={key} result={result} />;
      })}
    </div>
  );
};

export default Results;
