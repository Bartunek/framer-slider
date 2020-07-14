import React, { useContext, useMemo } from 'react'
import { motion, useTransform } from 'framer-motion'
import { SliderContext } from './Slider'

export function Progress({ total, active, activeColor }) {
  const { progress } = useContext(SliderContext)
  const height = useTransform(progress, [0, 1], ['0%', '100%'])

  const dots = useMemo(() => Array(total).fill(null).map((_, i) => i), [total])

  return (
    <div className="Progress">
      <motion.div
        style={{
          height,
          borderRadius: 3,
          backgroundColor: '#444'
        }}
      />
      {dots.map(i =>
        <motion.div
          key={i}
          className="ProgressDot"
          style={{
            top: `${(100 / total) * i}%`
          }}
          animate={{
            backgroundColor: i <= active ? '#444' : '#fff',
            boxShadow: i === active ? `0 0 0 3px ${activeColor}` : `0 0 0 0px ${activeColor}`
          }}
        />
      )}
    </div>
  )
}
