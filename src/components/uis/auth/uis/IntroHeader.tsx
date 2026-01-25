import { AnimatePresence, motion } from "framer-motion";

const IntroHeader = ({ text, delay }: { text: string; delay: number }) => {
  return (
    <>
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
            <h3 className="text-3xl text-[#1A4AAD] font-mono">{text}</h3>
          </motion.div>
        }
      </AnimatePresence>
    </>
  );
};

export default IntroHeader;
