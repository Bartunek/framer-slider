import React, { useContext } from 'react'
import { motion, useTransform } from 'framer-motion'
import { SliderContext } from './Slider'
import { useWindowSize } from '../hooks/use-window-size'

export function Content({ children, range, scaleIn, fullSize }) {
  const { width, height } = useWindowSize()
  const { progress } = useContext(SliderContext)
  const progressRange = [0, range.start, range.end, 1]
  const progressPercentRaw = useTransform(progress, progressRange, [0, 0, 100, 100])
  const progressWidth = useTransform(progressPercentRaw, val => `${val}%`)

  return (
    <>
      <motion.div
        className="ContentProgress"
        style={{ width: progressWidth }}
      />
      <motion.div
        variants={scaleIn ? scale : pull}
        initial="inactive"
        animate="active"
        style={fullSize ? {
          width,
          height
        } : {}}
      >
        {typeof children === 'function' ? children(progressPercentRaw) : children}
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
