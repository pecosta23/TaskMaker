// src/components/SubtaskList.jsx
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export default function SubtaskList({ taskId, subtasks, setSubtasks }) {
  // Carrega subtasks do localStorage
  useEffect(() => {
    if(!taskId) return
    try {
      const raw = localStorage.getItem(`task:${taskId}:subtasks`)
      if (raw) {
        setSubtasks(JSON.parse(raw))
      } else {
        setSubtasks([])
      }
    } catch {
      setSubtasks([])
    }
  }, [taskId, setSubtasks])

  // Persiste subtasks por tarefa
  useEffect(() => {
    if (!taskId) return
    localStorage.setItem(`task:${taskId}:subtasks`, JSON.stringify(subtasks))
  }, [taskId, subtasks])

  // funcao para alterar "feito"
  const toggleSubtask = (id) => {
    setSubtasks(prev =>
      prev.map(sub => sub.id === id ? { ...sub, done: !sub.done } : sub)
    )
  }

  // adiciona subtarefa
  const addSubtask = () => {
    setSubtasks(prev => [
      ...prev,
      { id: crypto.randomUUID(), title: '', done: false }
    ])
  }

  // editar título
  const updateSubtaskTitle = (id, value) => {
    setSubtasks(prev =>
      prev.map(sub => sub.id === id ? { ...sub, title: value } : sub)
    )
  }

  // delete
  const deleteSubtask = (id) => {
    setSubtasks(prev => prev.filter(sub => sub.id !== id))
  }

  // reordenar lista quando arrasta uma subtarefa
  const handleDragEnd = (result) => {
    if (!result.destination) return
    if (!result.source.index === result.destination.index) return

    const newOrder = [...subtasks]
    const [moved] = newOrder.splice(result.source.index, 1)
    newOrder.splice(result.destination.index, 0, moved)
    setSubtasks(newOrder)
  }

  return (
    <div className="mt-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="subtasks">
          {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-2 ${snapshot.isDraggingOver ? 'bg-none-50 rounded p-0' : ''}`}
          >
            {subtasks.map((sub, index) => (
              <Draggable key={sub.id} draggableId={String(sub.id)} index={index}>
                {(provided, snapshot) => (
                  <motion.div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      boxShadow: snapshot.isDragging ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                      background: snapshot.isDragging ? '#fd7e3' : '', // muda a cor durante o arrasto
                    }}
                    className="flex items-center justify-between bg-creme dark:bg-[#1c1b1a] px-3 py-2 rounded border border-cinzaEscuro dark:border-[#2a2a28] cursor-grab"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="checkbox"
                        checked={sub.done}
                        onChange={() => toggleSubtask(sub.id)}
                        className="appearance-none w-4 h-4 border-2 border-marrom rounded-full dark:checked:bg-creme dark:border-creme checked:bg-marrom checked:border-marrom cursor-pointer transition duration-200"
                      />
                      <input
                        value={sub.title}
                        onChange={(e) => updateSubtaskTitle(sub.id, e.target.value)}
                        className={`bg-transparent text-marrom dark:text-creme w-full outline-none ${
                          sub.done ? 'line-through opacity-60' : ''
                        }`}
                      />
                      <button
                        onClick={() => deleteSubtask(sub.id)}
                        className="text-marrom hover:text-red-500 transition duration-200 ml-2"
                        title="Excluir subtarefa"
                      >
                        <b>x</b>
                      </button>
                    </div>
                  </motion.div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex justify-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1, ease: 'easeOut'}}
          className="bg-marrom text-white px-4 py-2 rounded-full hover:bg-opacity-80 transition text-sm font-medium"
          onClick={addSubtask}
        >
          Adicionar subtarefa
        </motion.button>
      </div>
    </div>
  )
}
