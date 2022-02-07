import * as React from "react"
import { Highlight } from "~/components/highlight"
import {
  Body,
  BodyContent,
  BodyHeader,
  Description,
  LeftContent,
  RightContent,
  TriangleContentScrollable,
} from "~/components/layout"
import { NextButton } from "~/components/nextLink"
import { useTriangleState } from "~/components/triangle"

export default function FirstConsequenceRoute() {
  const { size, generator, settings } = useTriangleState({
    size: 8,
    settings: { isScaled: true },
  })
  const highlightCellsAdd = (addendsIds: string[], sumId: string) => () => {
    addendsIds.forEach(id => {
      const cell = document.getElementById(`cell-${id}`)
      cell?.classList.toggle("bg-orange-300")
    })
    const cell = document.getElementById(`cell-${sumId}`)
    cell?.classList.toggle("bg-green-300")
  }

  return (
    <Body>
      <BodyHeader title={"1st Consequence"} />
      <BodyContent>
        <LeftContent>
          <Description>
            In every arithmetical triangle all the cells of the first parallel
            row and of the first perpendicular row are the same as the
            generating cell.
          </Description>
          <p>
            For by definition each cell of the triangle is equal to the sum of
            the immediately preceding perpendicular and parallel cells. But the
            cells of the first parallel row have no preceding perpendicular
            cells, and those of the first perpendicular row have no preceding
            parallel cells; therefore they are all equal to each other and
            consequently to the generating number.
          </p>
          <div className="flex flex-row space-x-2">
            <div>Thus </div>
            <div>
              <Highlight action={highlightCellsAdd(["G"], "B")}>
                B = G + 0
              </Highlight>
              , that is,{" "}
              <Highlight action={highlightCellsAdd(["G"], "B")}>
                B = G
              </Highlight>
              <br />
              <Highlight action={highlightCellsAdd(["J"], "Q")}>
                Q = J + 0
              </Highlight>
              , that is,{" "}
              <Highlight action={highlightCellsAdd(["J"], "Q")}>
                Q = J
              </Highlight>
            </div>
          </div>
          <p>And similarly of the rest.</p>
          <NextButton />
        </LeftContent>
        <RightContent>
          <TriangleContentScrollable
            size={size}
            generator={generator}
            settings={settings}
          />
        </RightContent>
      </BodyContent>
    </Body>
  )
}
