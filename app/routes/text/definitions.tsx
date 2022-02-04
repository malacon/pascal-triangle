import * as React from "react"
import Triangle from "~/components/triangle"
import {
  Cell,
  generateTriangle,
  getBaseRowCells,
  getParallelRowCells,
  getPerpendicularRowCells,
} from "~/utils/math"

export default function Route() {
  const size = 6
  const generator = 1
  const triangleData = generateTriangle(size, generator)
  const [toggleBases, setToggleBases] = React.useState(false)
  const [toggleBase, setToggleBase] = React.useState<number>()
  console.log(triangleData)
  const highlightExponents = () => {
    const exponents = document.getElementsByClassName("exponent")
    for (let exponent of exponents) {
      exponent.classList.toggle("font-bold")
      exponent.classList.toggle("text-gray-900")
      exponent.classList.toggle("text-base")
    }
  }

  const highlightCell = (id: string) => () => {
    const cell = document.getElementById(`cell-${id}`)
    cell?.classList.toggle("bg-orange-300")
  }
  const highlightCells = (ids: string[]) => () => {
    ids.forEach(id => {
      const cell = document.getElementById(`cell-${id}`)
      cell?.classList.toggle("bg-orange-300")
    })
  }
  const highlightParallelRow = (exp: number) => () => {
    const row = getParallelRowCells(triangleData, exp)
    row.forEach(cell => highlightCell(cell.id)())
  }
  const highlightPerpendicularRow = (exp: number) => () => {
    const row = getPerpendicularRowCells(triangleData, exp)
    row.forEach(cell => highlightCell(cell.id)())
  }
  const highlightParallelAndPerpendicularRows = (cellId: string) => () => {
    const cell = triangleData.reduce<Cell | null>((cell, row) => {
      if (cell) return cell
      const t = row.reduce<Cell | null>((cell, currentCell) => {
        if (cell) return cell
        if (currentCell.id === cellId) return currentCell
        return cell
      }, null)
      return t
    }, null)
    highlightPerpendicularRow(cell?.perpendicularRow || 0)()
    highlightParallelRow(cell?.parallelRow || 0)()
    highlightCell(cellId)()
  }
  const highlightBaseRow = (exp: number) => () => {
    const row = getBaseRowCells(triangleData, exp)
    row.forEach(cell => highlightCell(cell.id)())
  }
  const perpendicularExponentBase = (cellId: string) => () => {
    highlightCell(cellId)()
    const cell = document.getElementById(`cell-${cellId}`)
    const parallelRow = cell?.dataset.parallelRow
    const perpendicularRow = cell?.dataset.perpendicularRow
    const exponents = document.getElementsByClassName("exponent")
    setToggleBase(num =>
      num ? undefined : Number(parallelRow) + Number(perpendicularRow) - 1
    )

    for (let exponent of exponents) {
      let exp = exponent as HTMLElement
      if (
        (exp.dataset.type === "exponent-parallelRow" &&
          exp.dataset.value === parallelRow) ||
        (exp.dataset.type === "exponent-perpendicularRow" &&
          exp.dataset.value === perpendicularRow)
      ) {
        console.log("TOGGLING")
        exp.classList.toggle("text-2xl")
        exp.classList.toggle("text-gray-900")
      }
      if (
        exp.dataset.type === "exponent-parallelRow" &&
        Number(exp.dataset.value) ===
          Number(perpendicularRow) + Number(parallelRow) - 1
      ) {
        exp.classList.toggle("text-2xl")
        exp.classList.toggle("text-green-500")
      }
    }
  }

  const highlightTriangle = (exp: number) => () => {
    triangleData.slice(0, exp).map((row, i) =>
      row.slice(0, exp - i).forEach((cell, j) => {
        const currentCell = document.getElementById(`cell-${cell.id}-triangle`)
        console.log({ exp, parallelRow: cell.parallelRow, id: cell.id, i, j })
        if (cell.parallelRow + j < exp) {
          currentCell?.classList.toggle("full-square")
        } else {
          currentCell?.classList.toggle("bottom-triangle")
        }
        currentCell?.classList.toggle("hidden")
      })
    )
  }

  return (
    <div className="overflow-hidden h-screen flex flex-col">
      <header className="bg-slate-700 text-gray-100 p-2">
        <h3 className="text-2xl font-bold">Definitions</h3>
      </header>
      <div className="flex-1 flex flex-row space-x-4 overflow-hidden">
        <div className="flex flex-col space-y-2 flex-1 overflow-auto p-2">
          <p>I call arithmetical triangle a figure constructed as follows:</p>
          <p>
            From any point, <Highlight action={highlightCell("G")}>G</Highlight>
            , I draw two lines perpendicular to each other,{" "}
            <Highlight
              action={highlightCells(["G", triangleData[size - 1][0].id])}
            >
              G{triangleData[size - 1][0].id}
            </Highlight>
            ,{" "}
            <Highlight
              action={highlightCells(["G", triangleData[0][size - 1].id])}
            >
              G{triangleData[0][size - 1].id}
            </Highlight>{" "}
            in each of which I take as many equal and contiguous parts as I
            please, beginning with{" "}
            <Highlight action={highlightCell("G")}>G</Highlight>, which I number
            1, 2, 3, 4, etc., and these numbers are the{" "}
            <Highlight action={highlightExponents}>exponents</Highlight> of the
            sections of the lines.
          </p>
          <p>
            Next I connect the points of the first section in each of the two
            lines by another line, which is the base of the{" "}
            <Highlight action={highlightTriangle(1)}>
              resulting triangle
            </Highlight>
            .
          </p>
          <p>
            In the same way I connect the two points of the second section by
            another line, making a{" "}
            <Highlight action={highlightTriangle(2)}>second triangle</Highlight>{" "}
            of which it is the base.
          </p>
          <p>
            And in this way{" "}
            <Highlight action={() => setToggleBases(curr => !curr)}>
              connecting all the points of section with the same exponent
            </Highlight>
            , I construct as many triangles and bases as there are exponents.
          </p>
          <p>
            Through each of the points of section and parallel to the sides I
            draw lines whose intersections make little squares which I call{" "}
            <Highlight action={highlightCell("N")}>cells</Highlight>.
          </p>
          <p>
            Cells between two parallels drawn from left to right are called
            cells of the same <b>parallel row</b>, as, for example, cells{" "}
            <Highlight action={highlightParallelRow(1)}>
              {getParallelRowCells(triangleData, 1)
                .map(c => c.id)
                .join(", ")}
            </Highlight>
            , or{" "}
            <Highlight action={highlightParallelRow(2)}>
              {getParallelRowCells(triangleData, 2)
                .map(c => c.id)
                .join(", ")}
            </Highlight>
            .
          </p>
          <p>
            Those between two lines are drawn from top to bottom are claeed
            cells of the same <b>perpendicular row</b>, as for example, cells{" "}
            <Highlight action={highlightPerpendicularRow(1)}>
              {getPerpendicularRowCells(triangleData, 1)
                .map(c => c.id)
                .join(", ")}
            </Highlight>
            , or{" "}
            <Highlight action={highlightPerpendicularRow(2)}>
              {getPerpendicularRowCells(triangleData, 2)
                .map(c => c.id)
                .join(", ")}
            </Highlight>
            .
          </p>
          <p>
            Those cut diagonally by the same base are called cells of the same
            base, as for example,{" "}
            <Highlight action={highlightBaseRow(4)}>
              {getBaseRowCells(triangleData, 4)
                .map(c => c.id)
                .reverse()
                .join(", ")}
            </Highlight>{" "}
            or{" "}
            <Highlight action={highlightBaseRow(3)}>
              {getBaseRowCells(triangleData, 3)
                .map(c => c.id)
                .reverse()
                .join(", ")}
            </Highlight>
            .
          </p>
          <p>
            Cells of the same base equidistant from its extremities are called
            reciprocals, as, for example,{" "}
            <Highlight action={highlightCells(["R", "K"])}>R, K</Highlight> and{" "}
            <Highlight action={highlightCells(["N", "J"])}>N, J</Highlight>,
            because the parallel exponent of one is the same as the
            perpendicular exponent of the other, as is apparent in the above
            example, where{" "}
            <Highlight action={highlightParallelAndPerpendicularRows("R")}>
              R
            </Highlight>{" "}
            is in the second perpendicular row and in the fourth parallel row
            and its reciprocal,{" "}
            <Highlight action={highlightParallelAndPerpendicularRows("K")}>
              K
            </Highlight>
            , is in the second parallel row and in the fourth parallel row,
            reciprocally. It is very easy to demonstrate that cells with
            exponents reciprocally the same are in the same base and are
            equidistant from its extremities.
          </p>
          <p>
            It is also very easy to demonstrate that the perpendicular exponent
            of{" "}
            <Highlight action={perpendicularExponentBase("R")}>
              any cell
            </Highlight>{" "}
            when added to is parallel exponent exceeds by unity the exponent of
            its base.
          </p>
        </div>

        <div className="w-[400px] margin-auto">
          <Triangle
            generator={generator}
            size={size}
            settings={{
              showBisector: false,
              showBases: toggleBases,
              showBase: toggleBase,
            }}
          />
        </div>
      </div>
    </div>
  )
}

type HighlightProps = { action: () => void; children: React.ReactNode }
const Highlight = ({ action, children }: HighlightProps) => {
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
