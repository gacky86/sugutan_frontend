import { AnimatePresence, motion } from "framer-motion";

const HowToUse = ({
  content,
  header,
  delay,
  firstImgSrc,
  secondImgSrc,
}: {
  content: string;
  header: string;
  delay: number;
  firstImgSrc: string;
  secondImgSrc: string;
}) => {
  return (
    <AnimatePresence mode="wait">
      {
        <motion.div
          variants={{
            offscreen: {
              // 画面外の場合のスタイル
              y: 100,
              opacity: 0,
            },
            onscreen: {
              // 画面内の場合のスタイル
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: delay,
              },
            },
          }}
          initial="offscreen" // 初期表示はoffscreen
          whileInView="onscreen" // 画面内に入ったらonscreen
          viewport={{ once: false, amount: 0 }}
        >
          <h3 className="text-center text-2xl text-[#0E3062] mt-4 mb-2">
            {header}
          </h3>
          <div className="flex justify-center">
            <img
              src={firstImgSrc}
              className="mx-auto w-[40%] rounded-lg mb-2"
            />
            <img
              src={secondImgSrc}
              className="mx-auto w-[40%] rounded-lg mb-2"
            />
          </div>
          <div className="flex items-start gap-2 text-gray-600">
            <span>{content}</span>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  );
};

export default HowToUse;
