// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TaskCard from '../components/TaskCard'
import Swal from 'sweetalert2'
import ThemeToggle from '../components/ThemeToggle'
import ClockPill from '../components/ClockPill'

export default function Home() {

  const [tasks, setTasks] = useState([])
  const [showInput, setShowInput] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('tasks')
    if (stored) setTasks(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleCreateTask = () => {
    if (newTaskName.trim()) {
      const id = Date.now()
      setTasks([...tasks, {id, name: newTaskName.trim() }])
      setNewTaskName('')
      setShowInput(false)
    }
  }

  const removeTask = async (idToRemove) => {
    const taskName = tasks.find(t => t.id === idToRemove)?.name || 'esta lista'

    const result = await Swal.fire({
      title: 'Confirmar exclusão?',
      text: `A lista "${taskName}" e todas as suas subtarefas serão apagadas.`,
      icon: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        icon: 'swal-icon-warning',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-btn swal-btn-confirm',
        cancelButton: 'swal-btn swal-btn-cancel',
        actions: 'swal-btn-actions'
      }, 
      confirmButtonText: 'Sim, apagar',
      cancelButtonText: 'Cancelar'
    })
    if (!result.isConfirmed) return

    setTasks((tasks) => tasks.filter((t) => t.id !== idToRemove))
    localStorage.removeItem(`task:${idToRemove}:subtasks`)
    localStorage.removeItem(`task:${idToRemove}:color`)
  }

  return (
    <div className="min-h-screen bg-creme text-marrom dark:bg-bgDarkHome dark:text-creme p-6">
      <ClockPill />
      <header className={`mb-7 ${tasks.length === 0 ? "flex flex-col items-center justify-center min-h-screen" : ""}`}>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-marrom dark:text-creme text-3xl font-bold mt-10">Bora Nota</h1>
          <ThemeToggle />
          {!showInput ? (
            <motion.button
              whileHover={{ scale: 1.30 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, ease: 'easeOut'}}
              className="bg-marrom text-creme px-4 py-2 rounded-full text-sm font-medium hover:brightness-90 transition"
              onClick={() => setShowInput(true)}
            >
              Criar Tarefa
            </motion.button>
          ) : (
            <div className="mt-2 flex flex-col items-center gap-3">
              <input
                type="text"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Digite o nome da nova tarefa"
                className="px-6 py-2 rounded-full border border-cinzaEscuro bg-marrom text-creme placeholder-creme outline-none w-60 text-sm"
              />
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.20 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1, ease: 'easeOut'}}
                  className="bg-marrom text-creme px-4 py-2 rounded-full text-sm font-medium hover:brightness-90 hover:bg-opacity-80 transition"
                  onClick={handleCreateTask}
                >
                  Adicionar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.20 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1, ease: 'easeOut'}}
                  onClick={() => {setShowInput(false); setNewTaskName('')}}
                  className="px-4 py-2 rounded-full text-sm font-medium text-marrom border dark:text-creme dark:hover:bg-bgDarkHome border-cinzaEscuro hover:bg-creme transition"
                >
                  Cancelar
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </header>


      {/* Animações */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{
                opacity: 0,
                scaleY: 0.2,
                y: -20,
                clipPath: 'insert(50% 30% 50% 30% round 16px)',
              }}
              animate={{
                opacity: 1,
                scaleY: 1, 
                y: 0,
                clipPath: 'insert(0% 0% 0% 0% round 16px)',
              }}
              exit={{
                opacity: 0, 
                scaleY: 0.2, 
                y: -20,
                clipPath: 'insert(50% 30% 50% 30% round 16px)',
              }}
              transition={{ duration: 0.55, ease : [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top center'}}
            >
              <TaskCard
                taskId={task.id}
                name={task.name}
                onDelete={() => removeTask(task.id)}
                />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
