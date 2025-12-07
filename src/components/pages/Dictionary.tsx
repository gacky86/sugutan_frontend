import MainLayout from "@/components/layouts/MainLayout";
import ModalLayout from "@/components/layouts/ModalLayout";
import DictionaryContent from "@/components/uis/dictionary/DictionaryContent";

const Dictionary = () => {
  return (
    <div>
      <MainLayout childrenContent={<DictionaryContent />} />
      <ModalLayout />
    </div>
  );
};

export default Dictionary;
