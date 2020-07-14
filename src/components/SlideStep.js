import React, { useContext } from 'react'
import { motion, useTransform } from 'framer-motion'
import { SliderContext } from './Slider'

export function SlideStep({ children, number, slideCount, backgroundColor }) {
  const { width, height, progress } = useContext(SliderContext)
  const slideLength = 1 / slideCount

  const slideRange = [
    0,
    number > 0 ? slideLength * number - slideLength : 0,
    slideLength * number,
    slideLength * (number + 1),
    slideLength * (number + 2),
    1
  ]
  const opacity = useTransform(progress, slideRange, [0, 0, 1, 1, 0, 0 ])
  const y = useTransform(progress, slideRange, [200, 200, 0, 0, -200, -200])

  return (
    <motion.div
      className={`Slide Slide-${number}`}
      style={{
        width,
        height,
        opacity,
        y,
        backgroundColor
      }}
    >
      {children}
    </motion.div>
  )
}
