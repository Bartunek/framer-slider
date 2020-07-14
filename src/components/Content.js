import React, { useContext } from 'react'
import { motion, useTransform } from 'framer-motion'
import { SliderContext } from './Slider'

export function Content({ children, range, scaleIn }) {
  const { progress } = useContext(SliderContext)
  const progressRange = [0, range.start, range.end, 1]
  const width = useTransform(progress, progressRange, ['0%', '0%', '100%', '100%'])

  return (
    <>
      <motion.div
        className="ContentProgress"
        style={{ width }}
      />
      <motion.div
        variants={scaleIn ? scale : pull}
        initial="inactive"
        animate="active"
      >
        {children}
      </motion.div>
    </>
  )
}

const pull = {
  inactive: {
    opacity: 0,
    x: 100
  },
  active: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5
    }
  }
}

const scale = {
  inactive: {
    opacity: 0,
    scale: 0
  },
  active: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5
    }
  }
}
