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
        console.log("Landscape mode")
        setOrientation("landscape")
      } else {
        console.log("Portrait mode")
        setOrientation("portrait")
      }
    }

    function handleOrientationChange() {
      if (window.orientation === 0 || window.orientation === 180) {
        console.log("Portrait mode")
        setOrientation("portrait")
      } else if (window.orientation === 90 || window.orientation === -90) {
        console.log("Landscape mode")
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
