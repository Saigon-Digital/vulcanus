import React, {ReactNode, useEffect, useMemo, useRef, useState} from "react"
import {TitleBlockFragment} from "@/__generated__/graphql"

import {twMerge} from "tailwind-merge"
import {TitleShape} from "@/components/Icons"
import {useMediaQuery} from "@/hooks/useMediaQuery"
const ScrollMargin = 550

const TitleBlock: React.FC<TitleBlockFragment> = ({
  title,
  haveShape,
  haveBorderBottom,
  textSize = ["large"],
}) => {
  const size = textSize?.find((_, id) => id === 0) || textSize || "large"

  const id = `title-block-${encodeURIComponent(title?.slice(0, 20) || "")}`

  const titleRef = useRef<HTMLDivElement>(null)
  const [scrollEnd, setScrollEnd] = useState<boolean>(false)
  const [initialHeight, setInitialHeight] = useState<number | null>(null)
  const [isDomReady, setDomReady] = useState(false)
  const [isInit, setIsInit] = useState<boolean>(false)
  //#region footer setting

  const [rectTop, setRectTop] = useState<number | null>()
  const ref = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 880px)")

  const calcRatio = () => {
    if (isMobile) if (scrollEnd && !isInit) return null
    if (initialHeight && rectTop)
      return Math.abs((initialHeight - rectTop) * 100) / ScrollMargin
  }

  const ratio = calcRatio()

  useEffect(() => {
    if (!isDomReady) {
      setTimeout(() => {
        setDomReady(true)
      }, 1000)
      return
    }

    if (ratio && ratio > 95) {
      setScrollEnd(true)
    }
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((ele) => {
        if (!ele && !ref.current) return
        const calcTop = () => {
          const rect = ref.current?.getBoundingClientRect()
          const top = rect ? rect.top : 0
          setRectTop(top)
        }

        if (ele.isIntersecting) {
          let height = ele.boundingClientRect.top
          if (!isInit) {
            setIsInit(true)
            setInitialHeight(height)
          }
          document.addEventListener("scroll", calcTop)
        } else {
          document.removeEventListener("scroll", calcTop)
        }
      })
    }
    const observer = new IntersectionObserver(callback, {
      threshold: 0.9,
      rootMargin: "150px",
    })
    if (ref.current && !isInit) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
        observer.disconnect()
      }
    }
  }, [ratio, isDomReady])
  return (
    //#region
    <div key={id} id={id} ref={ref} className=" relative">
      <div
        className={`title-block container-fluid  grid grid-cols-12 py-10 md:py-14 lg:py-20 ${
          haveBorderBottom && " border-b border-[#E6ECF3]"
        }`}>
        <div
          ref={titleRef}
          className={twMerge(
            "scroll-title col-span-full max-w-[1565px]  font-bold md:col-span-10 xl:text-6xl 3xl:col-span-9 [&>*]:text-3xl [&>*]:tracking-tight ",
            size === "large"
              ? "3xl:leading-[89px] [&>*]:text-3xl 2xl:[&>*]:text-4xl 2xl:[&>*]:leading-[76px] 3xl:[&>*]:text-[64px] 3xl:[&>*]:leading-[89px]"
              : "2xl:leading-[67px] xl:[&>*]:text-5xl 2xl:[&>*]:leading-[67px]",
            !scrollEnd
              ? ratio &&
                  `scroll-${ratio > 0 ? ratio < 95 && Math.floor(ratio) : 0}`
              : `scroll-100`,
            !isInit && `scroll-0`
          )}
          dangerouslySetInnerHTML={{__html: title || ""}}></div>
        {haveShape && (
          <div>
            <TitleShape
              h={150}
              w={150}
              className="absolute -right-[10px] top-1/2 hidden -translate-y-1/2 lg:block"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default TitleBlock
