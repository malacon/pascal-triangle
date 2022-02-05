export type HighlightProps = { action: () => void; children: React.ReactNode }
export const Highlight = ({ action, children }: HighlightProps) => {
  return (
    <span
      className="underline font-bold cursor-pointer"
      onMouseOver={action}
      onMouseOut={action}
    >
      {children}
    </span>
  )
}
