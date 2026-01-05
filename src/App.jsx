import { useState, useEffect } from "react";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm";
import ContactCard from "./components/ContactCard";
import SearchBar from "./components/SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import konohaBg from "./assets/konoha-bg.jpg";

export default function App() {
  // 🌙 UI State
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState("");

  // 📇 Data State
  const [contacts, setContacts] = useState([]);

  // ⏳ UX Safety States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🟢 DB Status
  const [dbStatus, setDbStatus] = useState("checking");

  // 🌙 Dark Mode Effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // 🌐 Fetch Contacts (ENV-safe + toast-aware)
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contacts`
        );

        if (!res.ok) throw new Error("Failed to fetch contacts");

        const data = await res.json();
        setContacts(data);
      } catch (err) {
        const msg = err.message || "Unable to load contacts";
        setError(msg);
        toast.error(`❌ ${msg}`);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // 💓 DB Health Monitor
  useEffect(() => {
    const checkDB = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/health`
        );
        const data = await res.json();
        setDbStatus(data.status);
      } catch {
        setDbStatus("offline");
      }
    };

    checkDB();
    const interval = setInterval(checkDB, 10000);
    return () => clearInterval(interval);
  }, []);

  // 🔍 Search Filter
  const filteredContacts = contacts.filter(c =>
    `${c.firstName} ${c.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={dark ? "dark" : ""}>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${konohaBg})` }}
      >
        <div className="min-h-screen bg-black/40 dark:bg-black/70 backdrop-blur-sm">

          {/* 🌙 Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDark(prev => !prev)}
            className="
              fixed top-4 right-4 z-50 px-4 py-2 rounded-full
              bg-naruto text-black font-semibold shadow-naruto
              dark:bg-chakra dark:text-black
            "
          >
            {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </motion.button>

          {/* 🔥 Header */}
          <Header dbStatus={dbStatus} />

          {/* 🌊 Main Dashboard */}
          <main
            className="
              max-w-7xl mx-auto p-6 space-y-8
              bg-black/20 backdrop-blur-md
              rounded-2xl
            "
          >
            <ContactForm
              setContacts={setContacts}
              dbStatus={dbStatus}
            />

            <SearchBar setSearch={setSearch} />

            {/* ⏳ Loading */}
            {loading && (
              <p className="text-center text-yellow-300 font-semibold">
                ⏳ Loading contacts from the Hidden Leaf Database...
              </p>
            )}

            {/* ❌ Error */}
            {error && (
              <p className="text-center text-red-400 font-semibold">
                ❌ {error}
              </p>
            )}

            {/* 🌱 Empty State */}
            {!loading && !error && filteredContacts.length === 0 && (
              <p className="text-center text-white/60 italic">
                🌿 No ninjas registered yet. Add your first one!
              </p>
            )}

            {/* 📜 Contacts */}
            {!loading && !error && filteredContacts.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredContacts.map(contact => (
                    <ContactCard
                      key={contact._id}
                      contact={contact}
                      setContacts={setContacts}
                      dbStatus={dbStatus}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
