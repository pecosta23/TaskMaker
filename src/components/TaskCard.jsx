// src/components/TaskCard.jsx
import { useState, useEffect } from 'react'
import SubtaskList from './SubtaskList'
import ProgressBar from './ProgressBar'

export default function TaskCard({ taskId, name, onDelete }) {
  const [subtasks, setSubtasks] = useState([])
  const [progress, setProgress] = useState(0)
  const [progressColor, setProgressColor] = useState('bg-laranjaProgresso')

  // recalcula progresso quando as substaks mudam
  useEffect(() => {
    const total = subtasks.length
    const done = subtasks.filter((s) => s.done).length
    setProgress(total ? Math.round((done / total) * 100) : 0)
  }, [subtasks])

  // carrega a cor salva para a tarefa
  useEffect(() => {
    if(!taskId) return
    const saved = localStorage.getItem(`task:${taskId}:color`)
    if (saved) setProgressColor(saved)
  }, [taskId])

  // salva a acor sempre que mudar
  useEffect(() => {
    if (!taskId) return
    localStorage.setItem(`task:${taskId}:color`, progressColor)
  }, [taskId, progressColor])

  return (
    <div className="relative bg-gradient-to-br from-taskCardLightDe to-taskCardLightAte dark:from-taskCardDarkDe dark:to-taskCardDarkAte text-marrom dark:text-creme p-5 rounded-xl shadow-lg border border-cinzaEscuro dark:cinzaEscuro dark:border-cinzaEscuro">
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
        <button onClick={() => setProgressColor('bg-laranjaProgresso')} className="w-5 h-5 rounded-full bg-laranjaProgresso border-2 border-white cursor-pointer dark:border-creme" />
        <button onClick={() => setProgressColor('bg-azulProgresso')} className="w-5 h-5 rounded-full bg-azulProgresso border-2 border-white cursor-pointer dark:border-creme" />
        <button onClick={() => setProgressColor('bg-verdeProgresso')} className="w-5 h-5 rounded-full bg-verdeProgresso border-2 border-white cursor-pointer dark:border-creme" />
        <button onClick={() => setProgressColor('bg-rosaProgresso')} className="w-5 h-5 rounded-full bg-rosaProgresso border-2 border-white cursor-pointer dark:border-creme" />
      </div>
      
      <ProgressBar progress={progress} colorClass={progressColor}/>
      <p className="text-sm mt-2">Progresso: {progress}%</p>

      {/* Lista de subtarefas */}
      <SubtaskList taskId={taskId} subtasks={subtasks} setSubtasks={setSubtasks} />
    </div>
  )
}
