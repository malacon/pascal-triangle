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
  }

  return (
    <Body>
      <BodyHeader title={"2nd Consequence"} />
      <BodyContent>
        <LeftContent>
          <Description>
            In every arithmetical triangle each cell is equal to the sum of all
            the cells of the preceding parallel row from its own perpendicular
            row to the first, inclusive.
          </Description>
          <p>
            Let any cell, ω, be taken. I say that it is equal to R + θ + ψ + ϕ,
            which are the cells of the next higher parallel row from the
            perpendicular row of ω to the first perpendicular row.
          </p>
          <p>
            This is evident if we simply consider a cell as the sum of its
            component cells.
          </p>
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
