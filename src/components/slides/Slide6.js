import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const states={
  initial: 'initial',
  animate: 'show',
  exit: 'exit'
}

export function Slide6({ active }) {

  return (
    <AnimatePresence>
      {active >= 0 && <motion.h2 key={0} layoutTransition variants={variants} {...states}>Slide 6</motion.h2>}
      {active > 0 && <motion.div key={1} layoutTransition variants={variants} {...states}>Subcontent 1</motion.div>}
      {active > 1 && <motion.div key={2} layoutTransition variants={variants} {...states}>Subcontent 2</motion.div>}
      {active > 2 && <motion.div key={3} layoutTransition variants={variants} {...states}>Subcontent 3</motion.div>}
    </AnimatePresence>
  )
}

const variants = {
  initial: {
    y: -30,
    scale: 0.8,
    opacity: 0
  },
  show: {
    y: 0,
    scale: 1,
    opacity: 1
  },
  exit: {
    y: 30,
    scale: 0.8,
    opacity: 0
  }
}

