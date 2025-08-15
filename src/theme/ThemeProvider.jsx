//src/theme/ThemeProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null)
const THEME_KEY = 'theme-preference'; //sys, lig, dark

const getSystemTheme = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (pref) => {
    const resolved = pref === 'system' ? getSystemTheme() : pref;
    document.documentElement.classList.toggle('dark', resolved === 'dark')
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'system')

    useEffect(() => {
        applyTheme(theme)
        localStorage.setItem(THEME_KEY, theme)

        const mq = window.matchMedia('(prefers-color-scheme: dark)');

        if (theme === 'system') return
        const handler = () => applyTheme('system')
        mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler)
        return () => {
            mq.addEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler)
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)