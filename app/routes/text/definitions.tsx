import Triangle from "~/components/triangle"

export default function Route() {
  return (
    <div>
      <header>
        <h3>Definitions</h3>
      </header>
      <p>Some text</p>

      <Triangle
        generator={1}
        size={6}
        settings={{ showBisector: true, showBase: true }}
      />
    </div>
  )
}
