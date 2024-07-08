"use client"
import {CardsBlock_Fields} from "@/__generated__/graphql"
import Card from "../Card"
import "swiper/css"
import "swiper/css/pagination"

import {twMerge} from "tailwind-merge"
import {useState} from "react"
const Cards: React.FC<CardsBlock_Fields> = (props) => {
  let [heights, setHeights] = useState<number[]>([])
  const setCardHeight = (h: number) => {
    setHeights((prev) => {
      const temp = [...prev]
      temp.push(h)
      return [...temp]
    })
  }
  const maxHeight = props.cards
    ?.map((e) => e?.description?.length || 100)
    .sort((a, b) => b - a)
    .at(0)

  if (!maxHeight) return null
  return (
    <div className="cards container-fluid py-14">
      <h2 className="heading-2 mb-14">{props?.title}</h2>

      <div
        className={twMerge(
          "grid grid-cols-1 gap-4 md:grid-cols-3  ",
          props.cards?.length &&
            props.cards.length > 3 &&
            "md:grid-cols-2 xl:grid-cols-4"
        )}>
        {props?.cards?.map((card, id) => {
          return (
            <Card
              maxHeight={maxHeight}
              setCardHeight={setCardHeight}
              key={id}
              hasImage={card?.hasImage}
              iconImage={card?.iconImage}
              backgroundColor={card?.backgroundColor}
              title={card?.title || ""}
              description={card?.description}
              link={card?.link}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Cards
