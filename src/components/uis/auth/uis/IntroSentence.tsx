import { AnimatePresence, motion } from "framer-motion";

const IntroSentence = ({
  text,
  delay,
  imgSrc,
  imgAlt,
}: {
  text: string;
  delay: number;
  imgSrc?: string;
  imgAlt?: string;
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
          <div className="flex items-start gap-2 text-gray-600">
            <p>-</p>
            <span>{text}</span>
          </div>
          {imgSrc && (
            <img
              src={imgSrc}
              alt={imgAlt}
              className="mx-auto h-[300px] rounded-md mb-2"
            />
          )}
        </motion.div>
      }
    </AnimatePresence>
  );
};

export default IntroSentence;
