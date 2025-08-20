// src/components/ClockPill
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

export default function ClockPill() {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString("pt-BR", { hour12: false });
            setTime(formatted);
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ width: 40 }}
            animate={{ width: isOpen ? 210 : 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25}}
            className="fixed top-4 left-6 flex items-center rounded-full bg-clockPillLight text-marrom 
                        dark:bg-marrom dark:text-creme shadow-md overflow-hidden cursor-pointer select-none"
            onClick={() => setIsOpen(!isOpen)}
            >
                <div className="p-2">
                    <Clock size={20} />
                </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.span
                        key="time"
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 40, opacity: 1}}
                        exit={{ x: 40, opacity: 0}}
                        transition={{ duration: 0.3 }}
                        className="ml-1 mr-3 font-medium sm:inline"
                        >
                            {time}
                        </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
}