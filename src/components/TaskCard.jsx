// src/components/TaskCard.jsx
import { useState, useEffect } from 'react'
import SubtaskList from './SubtaskList'
import ProgressBar from './ProgressBar'

export default function TaskCard({ name, onDelete }) {
  const [subtasks, setSubtasks] = useState([
    { title: 'Tarefa não concluída', done: false },
    { title: 'Tarefa concluída', done: true },
  ])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const total = subtasks.length
    const done = subtasks.filter((s) => s.done).length
    setProgress(total ? Math.round((done / total) * 100) : 0)
  }, [subtasks])

  return (
    <div className="relative bg-gradient-to-br from-[#FBF6EC] to-[#F2E9DC] text-marrom p-5 rounded-xl shadow-lg border border-cinzaClaro">
      {/* Botão de lixeira */}
      <button
        className="absolute right-3 top-3 text-marrom hover:text-red-500"
        onClick={onDelete}
        title="Excluir tarefa"
      >
        🗑️
      </button>

      {/* Título da tarefa */}
      <h2 className="text-2xl font-semibold mb-2">{name}</h2>

      {/* Barra de progresso */}
      <ProgressBar progress={progress} />
      <p className="text-sm mt-2">Progresso: {progress}%</p>

      {/* Lista de subtarefas */}
      <SubtaskList subtasks={subtasks} setSubtasks={setSubtasks} />
    </div>
  )
}
