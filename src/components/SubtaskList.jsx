// src/components/SubtaskList.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SubtaskList({ subtasks, setSubtasks }) {
  const toggleSubtask = (index) => {
    const updated = [...subtasks]
    updated[index].done = !updated[index].done
    setSubtasks(updated)
  }

  const addSubtask = () => {
    setSubtasks([...subtasks, { title: '', done: false }])
  }

  const updateSubtaskTitle = (index, value) => {
    const updated = [...subtasks]
    updated[index].title = value
    setSubtasks(updated)
  } 

  const deleteSubtask = (index) => {
    const updated = subtasks.filter((_, i) => i !== index)
    setSubtasks(updated)
  }

  return (
    <div className="mt-4 space-y-2">
      {subtasks.map((sub, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-between bg-creme px-3 py-2 rounded border border-cinzaClaro"
        >
          <div className="flex itemns-center gap-2 w-full">
            <input
              type="checkbox"
              checked={sub.done}
              onChange={() => toggleSubtask(index)}
              className="apperance-none w-4 h-4 border-2 border-marrom rounded-full ckecked:bg-marrom checked:border-marrom cursor-pointer transition duration-200"
              />          
          <input 
            value={sub.title}
            onChange={(e) => updateSubtaskTitle(index, e.target.value)}
            className={`bg-transparent text-marrom w-full outline-none ${
              sub.done ? 'line-through opcacity-60' : ''
            }`}
          />
          <button
          onClick={() => deleteSubtask(index)}
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
