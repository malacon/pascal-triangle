import * as React from "react"
export type HighlightProps = { action: () => void; children: React.ReactNode }
export const Highlight = ({ action, children }: HighlightProps) => {
  const [state, setState] = React.useState<"clicked" | "hovered" | "idle">(
    "idle"
  )

  React.useEffect(() => {
    console.log(state)
  }, [state])

  const handleClick = () => {
    setState(state === "clicked" ? "hovered" : "clicked")
  }

  const handleMouseOver = () => {
    if (state !== "clicked") {
      action()

      setState(state === "hovered" ? "idle" : "hovered")
    }
  }

  return (
    <span
      className={`${
        state === "clicked" ? "opacity-50" : ""
      } underline font-bold cursor-pointer`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOver}
      onClick={handleClick}
    >
      {children}
    </span>
  )
}
