import { useContext, useState, useEffect } from 'react'
import { useTransform } from 'framer-motion'
import { SliderContext } from './Slider'

const slideRange = [0, 0, 1, 1]

export function Reveal({ children, range, itemCount }) {
  const [activeItem, setActiveItem] = useState(0)
  const { progress } = useContext(SliderContext)
  const progressRange = [0, range.start, range.end, 1]

  const slideProgress = useTransform(progress, progressRange, slideRange)
  const item = useTransform(slideProgress, val => Math.floor(val / (1 / itemCount)))

  useEffect(() => {
    function updateActiveItem(newActive) {
      if (newActive !== activeItem) setActiveItem(newActive)
    }

    const unsubscribeItem = item.onChange(updateActiveItem)

    return () => {
      unsubscribeItem()
    }
  }, [activeItem, setActiveItem, item])

  useEffect(() => {
    setActiveItem(item.get())
  }, [item, setActiveItem])

  return (
    children(activeItem)
  )
}
