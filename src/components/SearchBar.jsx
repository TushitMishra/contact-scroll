import { motion } from "framer-motion";

export default function SearchBar({ setSearch }) {
  return (
    <motion.input
      type="text"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      placeholder="Sense chakra..."
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-full
        mt-6
        px-6 py-4
        text-lg
        font-semibold
        tracking-wide

        bg-black/25
        backdrop-blur-lg
        border border-white/20
        rounded-2xl

        text-white
        placeholder:text-gray-300

        focus:outline-none
        focus:ring-2 focus:ring-naruto

        shadow-chakra
      "
    />
  );
}
