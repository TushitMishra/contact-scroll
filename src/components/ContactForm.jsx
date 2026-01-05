import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ContactForm({ setContacts, dbStatus }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const labels = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone No.",
  };

  // 🚀 STEP 5 — Polished Submit
  async function submit(e) {
    e.preventDefault();

    if (dbStatus !== "online") {
      toast.error("Database offline — cannot add ninja");
      return;
    }

    // 🧼 Client-side validation
    const cleanedForm = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    };

    if (Object.values(cleanedForm).some(v => v === "")) {
      toast.error("All fields are required");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL;
    if (!API_URL) {
      toast.error("API URL not configured");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedForm),
      });

      if (!res.ok) {
        throw new Error("Failed to add contact");
      }

      const newContact = await res.json();

      // ✅ Update UI
      setContacts(prev => [newContact, ...prev]);

      toast.success("🔥 Ninja added to the village");

      // 🔄 Reset
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      console.error("Submit error:", err.message);
      toast.error("❌ Failed to save ninja");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        bg-black/25
        backdrop-blur-xl
        border border-white/20
        rounded-2xl
        p-6
        shadow-naruto
      "
    >
      <h2 className="text-naruto font-semibold text-lg mb-4">
        📝 Register Ninja
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {["firstName", "lastName", "email", "phone"].map(field => (
          <input
            key={field}
            value={form[field]}
            onChange={e =>
              setForm({ ...form, [field]: e.target.value })
            }
            placeholder={labels[field]}
            required
            disabled={dbStatus !== "online" || submitting}
            className="
              w-full
              px-5 py-3
              text-base
              font-semibold
              tracking-wide
              bg-black/25
              backdrop-blur-lg
              border border-white/20
              rounded-xl
              text-white
              placeholder:text-gray-300
              focus:outline-none
              focus:ring-2 focus:ring-naruto
              shadow-naruto
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          />
        ))}
      </div>

      <motion.button
        disabled={dbStatus !== "online" || submitting}
        whileHover={
          dbStatus === "online" && !submitting ? { scale: 1.08 } : {}
        }
        whileTap={
          dbStatus === "online" && !submitting ? { scale: 0.95 } : {}
        }
        className={`
          mt-6 w-full py-3 rounded-xl font-bold tracking-wide
          ${
            dbStatus === "online" && !submitting
              ? "bg-naruto text-black"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }
        `}
      >
        {submitting ? "⏳ Saving..." : "🔥 Add to Village"}
      </motion.button>

      {dbStatus !== "online" && (
        <p className="text-center text-red-400 text-sm mt-3">
          Database offline — form disabled
        </p>
      )}
    </motion.form>
  );
}
