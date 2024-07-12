import {RefObject, MutableRefObject, useState, useEffect} from "react"
import React from "react"

const useWidthAndHeight = (ref: RefObject<HTMLDivElement>) => {
  const [d, setD] = useState<{w: number; h: number}>({w: 0, h: 0})

  useEffect(() => {
    if (!ref.current) return
    const calcWidth = () => {
      if (ref.current) {
        let width = ref.current.clientWidth || ref.current.offsetWidth
        width = width - 40
        let height = ref.current.clientHeight || ref.current.offsetHeight
        setD({w: width, h: height})
      }
    }
    calcWidth()
    if (typeof window !== undefined) {
      window.addEventListener("resize", calcWidth)
    }
    return () => window.removeEventListener("resize", calcWidth)
  }, [])

  return d ?? d
}

export default useWidthAndHeight
