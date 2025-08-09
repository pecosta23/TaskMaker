// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard'

export default function Home() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('tasks')
    if (stored) setTasks(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    const name = prompt('Digite o nome da tarefa:')
    if (name) {
      setTasks([...tasks, { name }])
    }
  }

  const removeTask = (indexToRemove) => {
    setTasks(tasks.filter((_, index) => index !== indexToRemove))
  }

  return (
    
    <div className="min-h-screen bg-creme p-6">
      <header className="mb-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-marrom text-3xl font-bold">Suas Tarefas</h1>
          <button
            className="bg-marrom text-white px-4 py-2 rounded-full text-sm font-medium hover:brightness-90 transition"
            onClick={addTask}
          >
            Criar Tarefa
          </button>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <TaskCard 
          key={index} 
          name={task.name}
          onDelete={() => removeTask(index)} />
        ))}
      </div>
    </div>
  )
}
