import MainLayout from "@/components/layouts/MainLayout";
import SettingContent from "@/components/uis/setting/SettingContent";

const Setting = () => {
  return (
    <div>
      <MainLayout childrenContent={<SettingContent />} />
    </div>
  );
};

export default Setting;
