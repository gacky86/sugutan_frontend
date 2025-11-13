import "animate.css";
import { useInView } from "react-intersection-observer";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const FadeInUpWrapper = ({ children, className }: Props) => {
  const { ref, inView } = useInView({
    rootMargin: "-50px", // 要素が表示されて50pxすぎたら
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className}>
      {inView && (
        <div className="animate__animated animate__fadeInUp">{children}</div>
      )}
    </div>
  );
};
