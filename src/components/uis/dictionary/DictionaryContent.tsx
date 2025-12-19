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
      <PageTitle text="表現検索" icon={FaSearch} />

      {/* メディアクエリmd以上で表示 */}
      <div className="hidden md:grid md:grid-cols-6 md:grid-rows-1 md:gap-4">
        <div className="col-span-4">
          <SearchBar />
          <div className="mx-6 mt-7">
            <Results />
          </div>
        </div>
        <div className="col-span-2 col-start-5">
          <RegFlashcard />
          <NewFlashcardButton />
        </div>
      </div>

      {/* メディアクエリmd以下で表示 */}
      <div className="md:hidden ">
        <SearchBar />
        <div className="flex gap-3 justify-center items-center mb-3">
          <RegFlashcard />
          <NewFlashcardButton />
        </div>
        <div className="mx-3">
          <Results />
        </div>
      </div>
      <LoadingOverlay isLoadingOverlay={loading} />
    </div>
  );
};

export default DictionaryContent;
