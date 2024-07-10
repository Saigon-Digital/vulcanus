import React, {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
} from "react"

export const TextContent = createContext<any>(null)

export const TextContentProvider = ({children}: PropsWithChildren) => {
  const [heights, setHeights] = useState<number[]>([])

  const setH = (h: number) => {
    setHeights((prev) => [...prev, h + 15])
  }
  const maxH = heights.sort((a, b) => b - a).at(0)
  return (
    <TextContent.Provider
      value={{
        heights,
        setH,
        maxH,
      }}>
      {children}
    </TextContent.Provider>
  )
}

export const useTextContent = () => useContext(TextContent)
