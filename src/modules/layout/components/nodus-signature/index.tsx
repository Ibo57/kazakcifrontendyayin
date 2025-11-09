"use client";
import { motion } from "framer-motion";

export default function NodusSignature() {
  return (
    <div className="flex justify-center items-center py-6 select-none">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-sm text-gray-400"
      >
        Built with{" "}
        <motion.span
          animate={{
            rotateY: [0, 15, -15, 15, -15, 0],
            scale: [1, 1.15, 1, 1.15, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1
          }}
          className="inline-block text-blue-500 mx-1"
        >
          💻
        </motion.span>
        {" "}
        <motion.a
          href="https://noduscode.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ color: "#60A5FA", scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-blue-400 font-semibold tracking-wide"
        >
          NodusCode
        </motion.a>
      </motion.p>
    </div>
  );
}
