// import {getImageProps} from "next/image"
import {useEffect, useState} from "react"

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ")
      return `url("${url}") ${dpi}`
    })
    .join(", ")
  return `image-set(${imageSet})`
}

function useImageStyle({
  w,
  h,
  src,
  alt,
  loading,
}: {
  w?: number
  h?: number
  src: string
  alt?: string
  priority?: boolean
  size?: string
  fill?: boolean
  loading?: "eager" | "lazy"
}) {
  
  return `url("${src}");`
}

export default useImageStyle
