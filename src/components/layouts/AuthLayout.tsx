import clsx from "clsx";

type Props = {
  childrenIntroduction: React.ReactNode;
  childrenForms: React.ReactNode;
  className?: string;
};

const AuthLayout = ({
  childrenIntroduction,
  childrenForms,
  className,
}: Props) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 grid-rows-auto gap-0 h-auto  justify-center items-center md:grid-cols-3 md:h-screen",
        className,
      )}
    >
      <div
        className="
          order-2 md:order-0
          col-span-1
          md:h-full
          md:overflow-y-auto
          scrollbar-hide
        "
      >
        {childrenIntroduction}
      </div>
      <div
        className="
          order-1 md:order-0
          col-span-1 md:col-span-2
          md:h-full
          overflow-hidden
          px-2 pb-3
          flex items-center justify-center
        "
      >
        {childrenForms}
      </div>
    </div>
  );
};

export default AuthLayout;
