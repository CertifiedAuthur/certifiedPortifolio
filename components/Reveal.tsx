'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type Direction = 'up' | 'left' | 'right'

const variants = {
  up:    { hidden: { opacity: 0, y: 44 },   visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -52 },  visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 52 },   visible: { opacity: 1, x: 0 } },
}

interface Props {
  children: React.ReactNode
  className?: string
  direction?: Direction
  delay?: number
}

export default function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
}: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[direction]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
