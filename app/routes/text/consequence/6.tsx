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
import { generateTriangle, getBaseRowCells } from "~/utils/math"

export default function FirstConsequenceRoute() {
  const { size, generator, setGenerator, settings, setSettings } =
    useTriangleState({
      size: 8,
      settings: {
        // showBisector: true,
        isScaled: true,
      },
    })
  const triangleData = generateTriangle(size, generator)
  const highlightCells = (ids: string[]) => () => {
    ids.forEach(id => {
      const cell = document.getElementById(`cell-${id}`)
      cell?.classList.toggle("bg-orange-300")
    })
  }
  const highlightCellsAdd = (addendsIds: string[], sumId: string) => () => {
    addendsIds.forEach(id => {
      const cell = document.getElementById(`cell-${id}`)
      cell?.classList.toggle("bg-orange-300")
    })
    const cell = document.getElementById(`cell-${sumId}`)
    cell?.classList.toggle("bg-green-300")
    cell?.classList.toggle("text-2xl")
  }
  const highlightExpressions = (left: string[], right: string[]) => () => {
    left.forEach(id => {
      const cell = document.getElementById(`cell-${id}`)
      cell?.classList.toggle("bg-orange-300")
    })
    right.forEach(id => {
      const cell = document.getElementById(`cell-${id}`)
      cell?.classList.toggle("bg-green-300")
    })
  }

  return (
    <Body>
      <BodyHeader title={"6th Consequence"} />
      <BodyContent>
        <LeftContent>
          <Description>TODO</Description>

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
