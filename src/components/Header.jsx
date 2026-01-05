import { motion } from "framer-motion";

export default function Header({ dbStatus }) {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        bg-black/30
        backdrop-blur-xl
        border-b border-naruto/40
        shadow-chakra
        sticky top-0 z-40
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">

        {/* 🍥 Rotating Naruto swirl */}
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          className="text-3xl"
        >
          🍥
        </motion.span>

        {/* Title */}
        <h1 className="text-2xl font-bold tracking-widest text-naruto">
          Contact Scroll
        </h1>

        {/* 🌿 LIVE DB STATUS INDICATOR */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            ml-auto px-4 py-1 rounded-full text-sm font-semibold
            backdrop-blur-lg border flex items-center gap-2
            ${
              dbStatus === "online"
                ? "bg-green-500/20 text-green-300 border-green-400/30 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                : dbStatus === "offline"
                ? "bg-red-500/20 text-red-300 border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
            }
          `}
        >
          <span className="text-xs">
            {dbStatus === "online"
              ? "🟢"
              : dbStatus === "offline"
              ? "🔴"
              : "🟡"}
          </span>
          Hidden Leaf Database
        </motion.div>

      </div>
    </motion.header>
  );
}
