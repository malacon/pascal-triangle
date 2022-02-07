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

      const cellData = document.querySelector<HTMLElement>(
        `#cell-${id} .value .value`
      )
      const currText = cellData?.innerText || ""
      if (cellData !== null) {
        if (currText.length > 1) {
          cellData.innerText = currText.slice(3)
        } else {
          cellData.innerText = `2 * ${currText}`
        }
      }
    })
  }

  return (
    <Body>
      <BodyHeader title={"7th Consequence"} />
      <BodyContent>
        <LeftContent>
          <Description>
            In every arithmetical triangle the sum of the cells of each base is
            double that of the preceding base.
          </Description>
          <p>
            Let any base,{" "}
            <Highlight
              action={() =>
                setSettings(s => ({
                  ...s,
                  showBase: s.showBase ? undefined : 4,
                }))
              }
            >
              {getBaseRowCells(triangleData, 4)
                .reverse()
                .map(c => c.id)
                .join("")}
            </Highlight>
            , be taken. I say that the sum of its cells is double the sum of the
            cells of the preceding base,{" "}
            <Highlight
              action={() =>
                setSettings(s => ({
                  ...s,
                  showBase: s.showBase ? undefined : 3,
                }))
              }
            >
              {getBaseRowCells(triangleData, 3)
                .reverse()
                .map(c => c.id)
                .join("")}
            </Highlight>
            .
          </p>
          <p>
            Therefore{" "}
            <Highlight
              action={highlightExpressions(
                [...getBaseRowCells(triangleData, 4).map(c => c.id)],
                [...getBaseRowCells(triangleData, 3).map(c => c.id)]
              )}
            >
              {getBaseRowCells(triangleData, 4)
                .reverse()
                .map(c => c.id)
                .join(" + ")}{" "}
              ={" "}
              {getBaseRowCells(triangleData, 3)
                .reverse()
                .map(c => `2${c.id}`)
                .join(" + ")}
              .
            </Highlight>
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
