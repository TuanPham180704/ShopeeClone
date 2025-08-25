import React, { useId, useRef, useState, type ElementType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { arrow, FloatingPortal, offset, shift, useFloating, type Placement } from '@floating-ui/react-dom-interactions'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  playcement?: Placement
}

export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initialOpen,
  playcement = 'bottom-end'
}: Props) {
  const [open, setOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const id = useId()
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: playcement
  })
  const showPoppover = () => {
    setOpen(true)
  }
  const hidePoppover = () => {
    setOpen(false)
  }
  return (
    <Element className={className} ref={reference} onMouseEnter={showPoppover} onMouseLeave={hidePoppover}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.3 }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] absolute translate-y-[-95%] z-10'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
