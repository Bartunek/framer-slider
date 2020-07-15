import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { SliderContext } from './Slider'

export function SlideSmooth({ children, slideCount, backgroundColor, number, active, previous, direction,  }) {
  const { width, height } = useContext(SliderContext)
  const slideLength = 1 / slideCount
  const range = {
    start: slideLength * number,
    end: slideLength * (number + 1)
  }

  return (
    <motion.div
      className={`Slide Slide-${number}`}
      variants={variants}
      animate={ active ? 'active' : 'inactive' }
      custom={{ direction, previous }}
      style={{
        width,
        height,
        backgroundColor
      }}
    >
      {typeof children === 'function'
        ? children(range)
        : active
          ? children
          : null
      }
    </motion.div>
  )
}

const variants = {
  inactive: ({ direction, previous }) => ({
    y: previous ? direction * -200 : direction * 200,
    opacity: 0.75,
    zIndex: 0,
    transition: {
      duration: 0.5,
      ease: 'easeIn'
    },
    transitionEnd: {
      display: 'none',
    },
  }),
  active: {
    y: 0,
    opacity: 1,
    display: 'flex',
    zIndex: 1,
    transition: {
      duration: 0.5,
      // delay: 0.25,
      ease: 'easeOut',
      when: 'beforeChildren'
    }
  }
}
