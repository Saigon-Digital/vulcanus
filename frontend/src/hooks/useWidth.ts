import {RefObject, MutableRefObject, useState, useEffect} from "react"
import React from "react"

const useWidth = (ref: RefObject<HTMLDivElement>) => {
  const [w, setW] = useState<number | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const calcWidth = () => {
      if (ref.current) {
        let width = ref.current.clientWidth || ref.current.offsetWidth
        width = width - 40
        setW(width)
      }
    }
    calcWidth()
    if (typeof window !== undefined) {
      window.addEventListener("resize", calcWidth)
    }
    return () => window.removeEventListener("resize", calcWidth)
  }, [])

  return w ?? w
}

export default useWidth
