import React, { createContext, useMemo, cloneElement, useEffect, useState, useLayoutEffect } from 'react'
import { motion , useViewportScroll, useTransform } from 'framer-motion'

import { useWindowSize } from '../hooks/use-window-size'
import { usePrevious } from '../hooks/use-previous'
import { Progress } from './Progress'

export const SliderContext = createContext({ width: 0, height: 0, scrollHeight: 0, progress: null })

export function Slider({ children, slideSize = 1 }) {
  const windowSize = useWindowSize()
  const { scrollYProgress, scrollY } = useViewportScroll()
  const slide = useTransform(scrollY, scroll => Math.floor(scroll / (windowSize.height * slideSize)))

  const [activeSlide, setActiveSlide] = useState(0)
  const prevActiveSlide = usePrevious(activeSlide)
  const direction = prevActiveSlide ? Math.sign(activeSlide - prevActiveSlide) : 1

  const slideCount = useMemo(() => children.length || 0, [children])
  const scrollHeight = useMemo(() => windowSize.height * slideCount * slideSize, [slideCount, windowSize.height, slideSize])
  const colors = useMemo(() => Array(slideCount).fill(null).map((_, i) => `hsl(${(360 / slideCount) * i}, 100%, 50%)`), [slideCount])

  useEffect(() => {
    function updateActiveSlide(newActive) {
      if (newActive !== activeSlide) setActiveSlide(newActive)
    }

    const unsubscribeScroll = slide.onChange(updateActiveSlide)

    return () => {
      unsubscribeScroll()
    }
  }, [activeSlide, setActiveSlide, slide])

  useLayoutEffect(() => {
    const newActive = slide.get()
    if (newActive !== activeSlide) setActiveSlide(newActive)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SliderContext.Provider value={{ ...windowSize, scrollHeight, progress: scrollYProgress }}>
      <Progress total={slideCount} active={activeSlide} activeColor={colors[activeSlide]} />
      <motion.div
        className="Slider"
        style={{ height: scrollHeight }}
      >
        {children.map((child, i) => cloneElement(child, {
          number: i,
          key: i,
          slideCount,
          active: activeSlide === i,
          previous: prevActiveSlide === i,
          direction,
          backgroundColor: colors[i]
        }))}
      </motion.div>
    </SliderContext.Provider>
  )
}
