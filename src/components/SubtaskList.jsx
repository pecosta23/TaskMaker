// src/components/SubtaskList.jsx
import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SubtaskList({ taskId, subtasks, setSubtasks }) {
  // Carrega subtasks do localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`task:${taskId}:subtasks`)
      if (raw) setSubtasks(JSON.parse(raw))
    } catch {
      setSubtasks([])
    }
  }, [taskId])

  // Persiste subtasks no localStorage sempre que mudam
  useEffect(() => {
    localStorage.setItem(`task:${taskId}:subtasks`, JSON.stringify(subtasks))
  }, [taskId, subtasks])

  const toggleSubtask = (id) => {
    setSubtasks(prev =>
      prev.map(sub => sub.id === id ? { ...sub, done: !sub.done } : sub)
    )
  }

  const addSubtask = () => {
    setSubtasks(prev => [
      ...prev,
      { id: crypto.randomUUID(), title: '', done: false }
    ])
  }

  const updateSubtaskTitle = (id, value) => {
    setSubtasks(prev =>
      prev.map(sub => sub.id === id ? { ...sub, title: value } : sub)
    )
  }

  const deleteSubtask = (id) => {
    setSubtasks(prev => prev.filter(sub => sub.id !== id))
  }

  return (
    <div className="mt-4 space-y-2">
      {subtasks.map((sub) => (
        <motion.div
          key={sub.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-between bg-creme px-3 py-2 rounded border border-cinzaClaro"
        >
          <div className="flex items-center gap-2 w-full">
            <input
              type="checkbox"
              checked={sub.done}
              onChange={() => toggleSubtask(sub.id)}
              className="appearance-none w-4 h-4 border-2 border-marrom rounded-full checked:bg-marrom checked:border-marrom cursor-pointer transition duration-200"
            />
            <input
              value={sub.title}
              onChange={(e) => updateSubtaskTitle(sub.id, e.target.value)}
              className={`bg-transparent text-marrom w-full outline-none ${
                sub.done ? 'line-through opacity-60' : ''
              }`}
            />
            <button
              onClick={() => deleteSubtask(sub.id)}
              className="text-marrom hover:text-red-500 transition duration-200 ml-2"
              title="Excluir subtarefa"
            >
              x
            </button>
          </div>
        </motion.div>
      ))}
      <div className="flex justify-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, ease: 'easeOut'}}
          className="bg-marrom text-creme px-4 py-2 rounded-full hover:bg-opacity-80 transition text-sm font-medium"
          onClick={addSubtask}
        >
          Adicionar subtarefa
        </motion.button>
      </div>
    </div>
  )
}
