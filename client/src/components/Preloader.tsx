import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-background flex items-center justify-center z-50"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-primary text-5xl font-bold mb-2"
          >
            DV
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-1 bg-primary mx-auto rounded-full"
          >
            <motion.div
              animate={{ 
                x: ["0%", "100%", "0%"],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="h-full w-8 bg-primary rounded-full opacity-80"
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
