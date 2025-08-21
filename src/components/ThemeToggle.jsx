// src/components/ThemeToggle
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

const options = [
  { key: "system", icon: "💻", label: "Sistema" },
  { key: "light", icon: "🌤️", label: "Claro" },
  { key: "dark", icon: "🌑", label: "Escuro" },
];

export default function ThemePill() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ width: 40 }}
      animate={{ width: isOpen ? 200 : 40 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed top-4 right-6 flex flex-row-reverse items-center rounded-full 
                 bg-themePillLight text-marrom dark:bg-marrom dark:text-creme 
                 shadow-md overflow-hidden cursor-pointer select-none"
      onClick={() => setIsOpen(!isOpen)}
    >
      
      <div className="p-2 shrink">
        <Monitor size={20} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="themes"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-2 pr-3"
          >
            {options.map((opt) => {
              const active = theme === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme(opt.key);
                  }}
                  className={`px-2 py-1 rounded-full text-sm border transition
                    ${active
                      ? "bg-marrom text-white border-marrom"
                      : "bg-creme text-marrom border-cinzaEscuro hover:bg-creme"}
                    dark:${
                      active
                        ? "bg-white text-marrom border-marrom"
                        : "text-creme border-cinzaClaro hover:bg-creme"
                    }
                  `}
                  title={opt.label}
                >
                  <span>{opt.icon}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
