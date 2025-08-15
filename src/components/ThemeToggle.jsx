// src/components/ThemeToggle
import { useTheme } from '../theme/ThemeProvider'

const options = [
    { key: 'system', label: '', icon: '💻'},
    { key: 'light', label: '', icon: '🌤️'},
    { key: 'dark', label: '', icon: '🌑'},
]

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex gap-2 items-center" role="radiogroup" aria-label="Theme">
            {options.map(opt => {
                const active = theme === opt.key
                return (
                    <button
                        key={opt.key}
                        role="radio"
                        aria-checked={active}
                        onClick={() => setTheme(opt.key)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition
                            ${active
                                ? 'bg-marrom text-white border-marrom'
                                : 'bg-transparent text-marrom border-cinzaEscuro hover:bg-creme'
                            }
                            dark:${active ? 'bg-white text-marrom border-white' : 'text-creme border-cinzaClaro hover:bg-[#2a2a2a]'}
                            `}
                        title={opt.label}
                    >
                        <span className="mr">{opt.icon}</span>{opt.label}
                    </button>
                )
            })}
        </div>
    )
}