import React, {useEffect, useState} from "react"

const useOrientation = ({
  isMobile,
}: {
  isMobile?: boolean | null | undefined
}) => {
  const [orientation, setOrientation] = useState<
    "portrait" | "landscape" | null
  >(null)

  useEffect(() => {
    if (!isMobile) return

    function handleResize() {
      if (window.innerWidth > window.innerHeight) {
        setOrientation("landscape")
      } else {
        setOrientation("portrait")
      }
    }

    function handleOrientationChange() {
      if (window.orientation === 0 || window.orientation === 180) {
        setOrientation("portrait")
      } else if (window.orientation === 90 || window.orientation === -90) {
        setOrientation("landscape")
      }
    }
    handleResize()
    window.addEventListener("orientationchange", handleOrientationChange)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return orientation
}

export default useOrientation
