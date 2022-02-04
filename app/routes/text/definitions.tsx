import * as React from "react"
import Triangle from "~/components/triangle"
import {
  generateTriangle,
  getBaseRowCells,
  getParallelRowCells,
  getPerpendicularRowCells,
} from "~/utils/math"

export default function Route() {
  const size = 6
  const generator = 1
  const triangleData = generateTriangle(size, generator)
  const [toggleBase, setToggleBase] = React.useState(false)
  const highlightExponents = () => {
    const exponents = document.getElementsByClassName("exponent")
    for (let exponent of exponents) {
      exponent.classList.toggle("font-bold")
      exponent.classList.toggle("text-black")
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
  const highlightBaseRow = (exp: number) => () => {
    const row = getBaseRowCells(triangleData, exp)
    row.forEach(cell => highlightCell(cell.id)())
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
            <Highlight action={() => setToggleBase(curr => !curr)}>
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
            cells of the same parallel row, as, for example, cells{" "}
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
            cells of the same perpendicular row, as for example, cells{" "}
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
            reciprocals, as, for example, E, R and B, D, because the parallel
            exponent of one is the same as the perpendicular exponent of the
            other, as is apparent in the above example, where E is in the second
            perpendicular row and in the fourth parallel row and its reciprocal,
            R, is in the second parallel row and in the fourth parallel row,
            reciprocally. It is very easy to demonstrate that cells with
            exponents reciprocally the same are in the same base and are
            equidistant from its extremities.
          </p>
        </div>

        <div className="w-[400px] margin-auto">
          <Triangle
            generator={generator}
            size={size}
            settings={{
              showBisector: true,
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
