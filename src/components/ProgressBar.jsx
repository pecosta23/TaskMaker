// src/components/ProgressBar.jsx
import { motion } from 'framer-motion'

export default function ProgressBar({ progress }) {
  const progressWidth = `${progress}%`

  return (
    <div className="w-full h-3 bg-cinzaClaro rounded overflow-hidden">
      <motion.div
        className="bg-verdeProgresso h-3 rounded"
        initial={{ width:0 }}
        animate={{ width: progressWidth}}
        transition={{ duration: 0.5, ease: `easeOut`}}
      />
    </div>
  )
}
