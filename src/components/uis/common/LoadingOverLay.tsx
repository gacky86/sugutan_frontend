import { AnimatePresence, motion } from "framer-motion";
import { DNA } from "react-loader-spinner";

const LoadingOverlay = ({
  isLoadingOverlay,
}: {
  isLoadingOverlay: boolean;
}) => {
  return (
    <AnimatePresence mode="wait">
      {isLoadingOverlay && (
        <motion.div
          key="loading-overLay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="fixed top-0 left-0 w-full h-screen z-999 bg-[rgba(0,0,0,0.3)]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <DNA height={200} width={200} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
