import { FaSearch } from "react-icons/fa";
import PageTitle from "@/components/uis/common/PageTitle";
import RegFlashcard from "@/components/uis/dictionary/uis/RegFlashcard";
// import SearchOption from "@/components/uis/dictionary/uis/SearchOption";
import Results from "@/components/uis/dictionary/uis/Results";
import SearchBar from "@/components/uis/dictionary/uis/SearchBar";
import LoadingOverlay from "@/components/uis/common/LoadingOverLay";
import { useSelector } from "react-redux";
import NewFlashcardButton from "@/components/uis/dictionary/uis/NewFlashcardButton";
import type { RootState } from "@/stores";

const DictionaryContent = () => {
  const loading = useSelector((state: RootState) => state.dictionary.loading);

  return (
    <div>
      <PageTitle text="AI辞書" icon={FaSearch} />

      <div className="flex flex-col md:grid md:grid-cols-6 md:gap-4">
        {/* 1. 検索バー (常に最初) */}
        <div className="md:col-span-4 order-1">
          <SearchBar />
        </div>

        {/* 2. ボタン類 (モバイルでは2番目、デスクトップではサイドバー) */}
        <div className="order-2 flex gap-3 justify-center my-3 md:block md:col-span-2 md:my-0">
          <RegFlashcard />
          <NewFlashcardButton />
        </div>

        {/* 3. 検索結果 (モバイルでは3番目、デスクトップでは左側の下) */}
        <div className="order-3 md:col-span-4 md:mx-6">
          <Results />
        </div>
      </div>
      <LoadingOverlay isLoadingOverlay={loading} />
    </div>
  );
};

export default DictionaryContent;
