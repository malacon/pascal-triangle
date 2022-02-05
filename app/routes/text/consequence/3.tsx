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
  const { size, generator, settings } = useTriangleState({ size: 8 })
  const highlightCellsAdd = (addendsIds: string[], sumId: string) => () => {
    addendsIds.forEach(id => {
      const cell = document.getElementById(`cell-${id}`)
      cell?.classList.toggle("bg-orange-300")
    })
    const cell = document.getElementById(`cell-${sumId}`)
    cell?.classList.toggle("bg-green-300")
    cell?.classList.toggle("text-2xl")
  }

  return (
    <Body>
      <BodyHeader title={"3rd Consequence"} />
      <BodyContent>
        <LeftContent>
          <Description>
            In every arithmetical triangle each cell is equal to the sum of all
            the cells of the preceding perpendicular row from its own parallel
            row to the first, inclusive.
          </Description>
          <p>
            Let any cell,{" "}
            <Highlight action={highlightCellsAdd(["B", "K", "R"], "S")}>
              S
            </Highlight>
            , be taken. I say that it is equal to{" "}
            <Highlight action={highlightCellsAdd(["B", "K", "R"], "S")}>
              B + K + R
            </Highlight>
            , which are the cells of the preceding perpendicular row from the
            parallel row of cell S to the first parallel row.
          </p>
          <p>
            This is evident if we simply consider a cell as the sum of its
            component cells.
          </p>
          {/* TODO: Add logic?? */}
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
