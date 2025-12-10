import { useSelector } from "react-redux";
import type { RootState } from "@/stores/index";
import ResultCard from "@/components/uis/dictionary/uis/ResultCard";

const Results = () => {
  const results = useSelector((state: RootState) => state.dictionary.results);

  return (
    <div>
      {results.length > 0 ? (
        results.map((result, key) => {
          return <ResultCard key={key} result={result} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Results;
