import React, { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
        if(window.innerWidth <= 768){
            setIsMobile(true)
            setOpen(false)
        } else {
            setIsMobile(false)
            setOpen(true)
        }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
        window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleToggleSidebar = () => {
    setOpen(!open)
  }

  return { isMobile, open, handleToggleSidebar }
}

export default useWindowSize