import MainLayout from "@/components/layouts/MainLayout";
import ModalLayout from "@/components/layouts/ModalLayout";
import SettingContent from "@/components/uis/setting/SettingContent";

const Setting = () => {
  return (
    <div>
      <MainLayout childrenContent={<SettingContent />} />
      <ModalLayout />
    </div>
  );
};

export default Setting;
