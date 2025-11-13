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
        "grid grid-cols-3 grid-rows-1 gap-0 justify-center items-center h-screen",
        className
      )}
    >
      <div className="h-full">{childrenIntroduction}</div>
      <div className="col-span-2">{childrenForms}</div>
    </div>
  );
};

export default AuthLayout;
