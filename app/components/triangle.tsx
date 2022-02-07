import * as React from "react"
import { Cell, generateTriangle } from "~/utils/math"
/**
 *     border-top: 40px solid transparent;
    border-bottom: 40px solid transparent;
    border-left: 40px solid #0080005e;
    transform: rotate(-135deg);
    top: -26px;
    left: -6px;
    width: 0;
    height: 0;
 */
// "border-y-10 border-y-transparent border-l-10 border-l-green"

export const useTriangleState = ({
  generator = 1,
  size = 5,
  settings = {},
}: {
  generator?: number
  size?: number
  settings?: TriangleSettings
}) => {
  const [gen, setGen] = React.useState(generator)
  const [s, setS] = React.useState(size)
  const [set, setSet] = React.useState(settings)

  return {
    size: s,
    setSize: setS,
    generator: gen,
    setGenerator: setGen,
    settings: set,
    setSettings: setSet,
  }
}

export type TriangleProps = {
  size: number
  generator: number
  settings?: TriangleSettings
}
export type TriangleSettings = {
  showBisector?: boolean
  showBase?: number
  showBases?: boolean
  highlightExp?: boolean
  showTriangle?: number | undefined
  isScaled?: boolean
  rotate?: boolean
  colorOdd?: boolean
  hideValue?: boolean
}
const Triangle = ({
  size = 5,
  generator = 1,
  settings = {
    showBisector: false,
    highlightExp: false,
    showBases: false,
    isScaled: true,
    rotate: false,
    colorOdd: false,
    hideValue: false,
  },
}: TriangleProps) => {
  const triangleData = generateTriangle(size, generator)
  const leftShift = { left: `${size * 40}px` }
  const [currentSettings, setCurrentSettings] = React.useState(settings)

  React.useEffect(() => {
    console.log("settings")
    setCurrentSettings(settings)
  }, [currentSettings, settings])

  return (
    <div
      className={`triangle mt-4 flex flex-col ${
        currentSettings.isScaled === true ? "scale-75" : ""
      } relative origin-top-left ${currentSettings.rotate ? `rotate-45` : ""}`}
      style={currentSettings.rotate ? leftShift : {}}
    >
      <div className="row flex flex-row ">
        <div className="border-r w-6 border-b h-6 min-w-[24px] min-h-[24px] text-right"></div>
        {triangleData[0].map((cell, i) => (
          <Exponent
            type="perpendicular"
            value={cell.perpendicularRow}
            settings={currentSettings}
            updateSettings={setCurrentSettings}
            key={cell.perpendicularRow}
          />
        ))}
      </div>
      {triangleData.map(row => (
        <div key={row[0].parallelRow} className="row flex flex-row">
          <Exponent
            type="parallel"
            value={row[0].parallelRow}
            settings={currentSettings}
            updateSettings={setCurrentSettings}
          />
          {row.map(cell => (
            <Cell key={cell.id} cell={cell} settings={settings} />
          ))}
        </div>
      ))}
    </div>
  )
}

type ExponentState = "idle" | "selected"
const Exponent = ({
  value,
  type,
  settings,
  updateSettings,
}: {
  value: number
  type: "perpendicular" | "parallel"
  settings: TriangleSettings
  updateSettings: React.Dispatch<React.SetStateAction<TriangleSettings>>
}) => {
  const [state, setState] = React.useState<ExponentState>("idle")

  React.useEffect(() => {
    if (state === "selected") {
      const currentBase = settings.showBase
      console.log("exponent", currentBase, value)
      updateSettings(settings => ({
        ...settings,
        showBase: currentBase === value ? undefined : value,
      }))
    }
  }, [state])

  const handleToggleBase = () => {
    setState(state => (state === "idle" ? "selected" : "idle"))
  }

  return (
    <div
      onMouseEnter={handleToggleBase}
      onMouseLeave={handleToggleBase}
      data-type={`exponent-${type}Row`}
      data-value={value}
      className={`${
        settings.highlightExp ? "font-bold text-black" : "text-gray-300"
      } border-r border-b ${
        type === "parallel"
          ? "w-6 h-14 min-h-[56px] min-w-[24px]"
          : "w-14 h-6 min-w-[56px] min-h-[24px]"
      } text-right  pr-1 text-xs flex flex-col justify-end transition-all exponent cursor-pointer hover:text-black`}
    >
      <span className="value">{value}</span>
    </div>
  )
}

type CellState = "idle" | "selected" | "hover"
const Cell = ({
  cell,
  settings,
}: {
  cell: Cell
  settings: TriangleSettings
}) => {
  const [state, setState] = React.useState<CellState>("idle")
  const isSelected = state === "selected"

  const handleClick = () => {
    setState(state => (state === "selected" ? "idle" : "selected"))
  }

  return (
    <div
      data-perpendicular-row={cell.perpendicularRow}
      data-parallel-row={cell.parallelRow}
      data-value={cell.value}
      id={`cell-${cell.id}`}
      className={`cell border-r border-b p-0 m-0 min-h-[56px] min-w-[56px] w-14 h-14 text-center relative group cursor-pointer transition-all hover:bg-orange-300 ${
        isSelected ? "bg-orange-300" : ""
      } ${settings.colorOdd && cell.value % 2 === 1 ? "bg-green-400" : ""} `}
      onClick={handleClick}
    >
      <div className="w-14 h-14 flex flex-col absolute top-0 left-0">
        <div className="absolute h-full w-full flex place-items-start text-sm text-gray-400 group-hover:text-gray-700 transition-all">
          {!settings.hideValue && <span className=" pl-1">{cell.id}</span>}
        </div>
        <div className="value absolute mx-auto h-full w-full align-middle flex place-items-center justify-center group-hover:text-xl transition-all">
          {!settings.hideValue && (
            <span className={`value ${settings.rotate ? "-rotate-45" : ""}`}>
              {cell.value}
            </span>
          )}
        </div>
      </div>
      <div
        data-type="triangle"
        id={`cell-${cell.id}-triangle`}
        className="hidden absolute transition-all"
      ></div>
      {settings.showBisector && cell.parallelRow === cell.perpendicularRow && (
        <div
          data-type="bisector"
          className="w-20 h-1 flex flex-col absolute top-[27px] left-[-12px] rotate-45"
        >
          <hr className="bg-gray-400 " />
        </div>
      )}
      {(settings.showBase === cell.parallelRow + cell.perpendicularRow - 1 ||
        settings.showBases) && (
        <div
          data-type="base"
          data-value={cell.parallelRow + cell.perpendicularRow - 1}
          className="w-20 h-20 flex flex-col absolute top-4 left-4 -rotate-45 base"
        >
          <hr className="bg-gray-400 " />
        </div>
      )}
    </div>
  )
}

export default Triangle
