import EditButton from "@/components/uis/setting/uis/EditButton";

// redux
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/stores/index";
import { openModal } from "@/stores/modalSlice";
import type { AppDispatch } from "@/stores/index";
import PageTitle from "@/components/uis/common/PageTitle";
import { CiSettings } from "react-icons/ci";

const SettingContent = () => {
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <PageTitle text="アカウント設定" icon={CiSettings} />
      <div className="mx-4">
        <h3 className="text-lg">現在のメールアドレス</h3>
        <div className="flex justify-between items-center">
          <p>{currentUser?.email}</p>
          <EditButton
            ariaLabel="メールアドレス変更"
            onClick={() => dispatch(openModal({ modalContent: "editEmail" }))}
          />
        </div>
        <h3 className="text-lg mt-3">現在のパスワード</h3>
        <div className="flex justify-between items-center">
          <p>**********</p>
          <EditButton
            ariaLabel="パスワード変更"
            onClick={() =>
              dispatch(openModal({ modalContent: "editPassword" }))
            }
          />
        </div>
      </div>

      {/* 退会モーダルを開くボタン */}
      <div className="absolute bottom-15 right-5 cursor-pointer text-[#0E3062]">
        <button
          onClick={() => dispatch(openModal({ modalContent: "deleteAccount" }))}
        >
          アカウントの削除
        </button>
      </div>
    </div>
  );
};
export default SettingContent;
