import MainLayout from "@/components/layouts/MainLayout";
import ModalLayout from "@/components/layouts/ModalLayout";
import LearningContent from "@/components/uis/learning/LearningContent";

const Learning = () => {
  return (
    <div>
      <MainLayout childrenContent={<LearningContent />} />
      <ModalLayout />
    </div>
  );
};

export default Learning;
