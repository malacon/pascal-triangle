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
  const { size, generator, setGenerator, settings } = useTriangleState({
    size: 8,
    settings: {
      // showBisector: true,
      isScaled: true,
    },
  })
  const highlightCells = (ids: string[]) => () => {
    ids.forEach(id => {
      const cell = document.getElementById(`cell-${id}`)
      cell?.classList.toggle("bg-gray-300")
      cell?.classList.toggle("opacity-50")
    })
  }
  const highlightCellsAddSub =
    (addendsIds: string[], sumId: string, subId: string) => () => {
      addendsIds.forEach(id => {
        const cell = document.getElementById(`cell-${id}`)
        cell?.classList.toggle("bg-orange-300")
      })
      const cell = document.getElementById(`cell-${sumId}`)
      cell?.classList.toggle("bg-green-300")
      cell?.classList.toggle("text-2xl")
      const cell2 = document.getElementById(`cell-${subId}`)
      cell2?.classList.toggle("bg-red-300")
      cell2?.classList.toggle("text-2xl")
    }
  const highlightCellsAddSubDiffGenerator =
    (generator: number, addendsIds: string[], sumId: string, subId: string) =>
    () => {
      setGenerator(gen => (gen === 1 ? generator : 1))
      highlightCellsAddSub(addendsIds, sumId, subId)()
    }

  return (
    <Body>
      <BodyHeader title={"4th Consequence"} />
      <BodyContent>
        <LeftContent>
          <Description>
            In every arithmetical triangle each cell exceeds by unity the sum of
            all the cells within its parallel and perpendicular rows, exclusive.
          </Description>
          <p>
            Let any cell, U, be taken. I say that{" "}
            <Highlight
              action={highlightCellsAddSub(
                ["G", "B", "C", "D", "J", "K", "L", "M"],
                "U",
                "G"
              )}
            >
              U − G = G + B + C + D + J + K + L + M
            </Highlight>
            , which are all the numbers between row{" "}
            <Highlight action={highlightCells(["Q", "R", "S", "T", "U"])}>
              QRSTU
            </Highlight>{" "}
            and row{" "}
            <Highlight action={highlightCells(["E", "N", "U"])}>ENU</Highlight>{" "}
            exclusive.
          </p>
          <p>
            N.B. I have written in the enunciation each cell exceeds by unity
            because the generator is unity. If it were some other number, the
            enunciation should read:{" "}
            <Highlight
              action={highlightCellsAddSubDiffGenerator(
                4,
                ["G", "B", "C", "D", "J", "K", "L", "M"],
                "U",
                "G"
              )}
            >
              each cell exceeds by the generating number.
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
