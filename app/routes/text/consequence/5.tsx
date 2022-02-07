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
      <BodyHeader title={"5th Consequence"} />
      <BodyContent>
        <LeftContent>
          <Description>
            In every arithmetical triangle each cell is equal to its reciprocal.
          </Description>
          <p>
            For in the{" "}
            <Highlight
              action={() =>
                setSettings(s => ({
                  ...s,
                  showBase: s.showBase ? undefined : 2,
                }))
              }
            >
              second base,{" "}
              {getBaseRowCells(triangleData, 2)
                .map(c => c.id)
                .reverse()
                .join("")}
            </Highlight>
            , it is evident that the two reciprocal cells,{" "}
            <Highlight
              action={highlightCellsAdd(
                [...getBaseRowCells(triangleData, 2).map(c => c.id)],
                "G"
              )}
            >
              {getBaseRowCells(triangleData, 2)
                .map(c => c.id)
                .reverse()
                .join(", ")}
            </Highlight>
            , are equal to each other and to G.
          </p>
          <p>
            In the{" "}
            <Highlight
              action={() =>
                setSettings(s => ({
                  ...s,
                  showBase: s.showBase ? undefined : 3,
                }))
              }
            >
              third base,{" "}
              {getBaseRowCells(triangleData, 3)
                .map(c => c.id)
                .reverse()
                .join("")}
            </Highlight>
            , it is also obvious that the reciprocals,{" "}
            <Highlight
              action={highlightCellsAdd(
                [
                  ...getBaseRowCells(triangleData, 3)
                    .filter((el, i, arr) => i === 0 || i === arr.length - 1)
                    .map(c => c.id),
                ],
                "G"
              )}
            >
              {getBaseRowCells(triangleData, 3)
                .filter((el, i, arr) => i === 0 || i === arr.length - 1)
                .map(c => c.id)
                .reverse()
                .join(", ")}
            </Highlight>
            , are equal to each other and to G.
          </p>
          <p>
            In the{" "}
            <Highlight
              action={() =>
                setSettings(s => ({
                  ...s,
                  showBase: s.showBase ? undefined : 4,
                }))
              }
            >
              fourth base
            </Highlight>{" "}
            it is obvious that the extremes,{" "}
            <Highlight
              action={highlightCellsAdd(
                [
                  ...getBaseRowCells(triangleData, 4)
                    .filter((el, i, arr) => i === 0 || i === arr.length - 1)
                    .map(c => c.id),
                ],
                "G"
              )}
            >
              {getBaseRowCells(triangleData, 4)
                .filter((el, i, arr) => i === 0 || i === arr.length - 1)
                .map(c => c.id)
                .reverse()
                .join(", ")}
            </Highlight>
            , are again equal to each other and to G.
          </p>
          <p>
            And those between,{" "}
            <Highlight
              action={highlightCellsAdd(
                [
                  ...getBaseRowCells(triangleData, 4)
                    .filter((el, i, arr) => i !== 0 && i !== arr.length - 1)
                    .map(c => c.id),
                ],
                "G"
              )}
            >
              {getBaseRowCells(triangleData, 4)
                .filter((el, i, arr) => i !== 0 && i !== arr.length - 1)
                .map(c => c.id)
                .reverse()
                .join(", ")}
            </Highlight>
            , are obviously equal since{" "}
            <Highlight action={highlightCellsAdd(["Q", "K"], "R")}>
              R = Q + K
            </Highlight>{" "}
            and{" "}
            <Highlight action={highlightCellsAdd(["C", "K"], "L")}>
              L = K + C
            </Highlight>
            . But{" "}
            <Highlight action={highlightCellsAdd(["Q", "C"], "K")}>
              Q + K = K + C
            </Highlight>{" "}
            by what has just been shown. Therefore, etc.
          </p>
          <p>
            Similarly it can be shown for all the other bases that reciprocals
            are equal, because the extremes are always equal to G and the rest
            can always be considered as the sum of cells in the preceding base
            which are themselves reciprocals.
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
