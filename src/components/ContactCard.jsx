import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactCard({ contact, setContacts, dbStatus }) {
  const [deleting, setDeleting] = useState(false);

  // 🚀 STEP 5 — Safe Delete (Backend + UI)
  async function handleDelete() {
    if (dbStatus !== "online") {
      toast.error("Database offline — cannot delete ninja");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL;
    if (!API_URL) {
      toast.error("API URL not configured");
      return;
    }

    try {
      setDeleting(true);

      const res = await fetch(
        `${API_URL}/api/contacts/${contact._id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Failed to delete contact");
      }

      // ✅ Update UI
      setContacts(prev =>
        prev.filter(c => c._id !== contact._id)
      );

      toast.success("❌ Ninja removed from village");
    } catch (err) {
      console.error("Delete error:", err.message);
      toast.error("Failed to delete ninja");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="
        bg-black/25
        backdrop-blur-xl
        border border-white/15
        rounded-xl
        p-5
        shadow-chakra
        flex
        justify-between
        items-start
        gap-4
      "
    >
      {/* 📇 Contact Info */}
      <div className="space-y-1">
        <h3 className="font-semibold text-lg text-white">
          {contact.firstName} {contact.lastName}
        </h3>

        <p className="text-sm text-white/80">
          📧 {contact.email}
        </p>

        <p className="text-sm text-white/80">
          📞 {contact.phone}
        </p>
      </div>

      {/* ❌ Delete Button */}
      <motion.button
        disabled={dbStatus !== "online" || deleting}
        whileHover={
          dbStatus === "online" && !deleting ? { scale: 1.1 } : {}
        }
        whileTap={
          dbStatus === "online" && !deleting ? { scale: 0.95 } : {}
        }
        onClick={handleDelete}
        className={`
          font-semibold text-sm
          ${
            dbStatus === "online" && !deleting
              ? "text-red-400 hover:text-red-600"
              : "text-gray-400 cursor-not-allowed"
          }
        `}
      >
        {deleting ? "⏳" : "❌ Delete"}
      </motion.button>
    </motion.div>
  );
}
