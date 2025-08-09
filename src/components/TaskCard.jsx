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

  const [progressColor, setProgressColor] = useState('bg-laranjaProgresso')

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
      <div className="flex gap-2 items-center mb-2">
        <span className="text-sm">Cor da barra:</span>
        <button onClick={() => setProgressColor('bg-laranjaProgresso')} className="w-5 h-5 rounded-full bg-laranjaProgresso border-2 border-white cursor-pointer" />
        <button onClick={() => setProgressColor('bg-azulProgresso')} className="w-5 h-5 rounded-full bg-azulProgresso border-2 border-white cursor-pointer" />
        <button onClick={() => setProgressColor('bg-verdeProgresso')} className="w-5 h-5 rounded-full bg-verdeProgresso border-2 border-white cursor-pointer" />
      </div>
      
      <ProgressBar progress={progress} colorClass={progressColor}/>
      <p className="text-sm mt-2">Progresso: {progress}%</p>

      {/* Lista de subtarefas */}
      <SubtaskList subtasks={subtasks} setSubtasks={setSubtasks} />
    </div>
  )
}
