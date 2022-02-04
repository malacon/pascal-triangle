import { generateTriangle } from "~/utils/math"
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
type TriangleProps = {
  size: number
  generator: number
  settings?: {
    showBisector?: boolean
    showBase?: number
    showBases?: boolean
    highlightExp?: boolean
    showTriangle?: number | undefined
  }
}
const Triangle = ({
  size = 5,
  generator = 1,
  settings = { showBisector: false, highlightExp: false, showBases: false },
}: TriangleProps) => {
  const triangleData = generateTriangle(size, generator)
  return (
    <div className="triangle mt-4 flex flex-col  scale-75 relative origin-top-left">
      <div className="row flex flex-row ">
        <div className="border-r w-6 border-b h-6 text-right"></div>
        {triangleData[0].map((cell, i) => (
          <div
            data-type="exponent-perpendicularRow"
            data-value={cell.perpendicularRow}
            key={cell.id}
            className={`${
              settings.highlightExp ? "font-bold text-black" : "text-gray-300"
            } border-r border-b w-14 h-6 text-right  pr-1 text-xs flex flex-col justify-end transition-all exponent`}
          >
            <span>{cell.perpendicularRow}</span>
          </div>
        ))}
      </div>
      {triangleData.map((row, rowNum) => (
        <div key={rowNum} className="row flex flex-row">
          <div
            data-type="exponent-parallelRow"
            data-value={row[0].parallelRow}
            className={`${
              settings.highlightExp ? "font-bold text-black" : "text-gray-300"
            } border-b w-6 border-r h-14 text-center flex flex-col justify-end text-xs transition-all exponent`}
          >
            <span>{row[0].parallelRow}</span>
          </div>
          {row.map((cell, colNum) => (
            <div
              key={cell.id}
              data-perpendicular-row={cell.perpendicularRow}
              data-parallel-row={cell.parallelRow}
              data-value={cell.value}
              id={`cell-${cell.id}`}
              className="cell border-r border-b p-0 m-0 w-14 h-14 text-center relative group cursor-pointer transition-all hover:bg-orange-300"
            >
              <div className="w-14 h-14 flex flex-col absolute top-0 left-0">
                <div className="absolute h-full w-full flex place-items-start text-sm text-gray-400 group-hover:text-gray-700 transition-all">
                  <span className=" pl-1">{cell.id}</span>
                </div>
                <div className="absolute mx-auto h-full w-full align-middle flex place-items-center justify-center group-hover:text-xl transition-all">
                  <span>{cell.value}</span>
                </div>
              </div>
              <div
                data-type="triangle"
                id={`cell-${cell.id}-triangle`}
                className="hidden absolute transition-all"
              ></div>
              {settings.showBisector && rowNum === colNum && (
                <div
                  data-type="bisector"
                  className="w-20 h-1 flex flex-col absolute top-[27px] left-[-12px] rotate-45"
                >
                  <hr className="bg-gray-400 " />
                </div>
              )}
              {(settings.showBase ===
                cell.parallelRow + cell.perpendicularRow - 1 ||
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
          ))}
        </div>
      ))}
    </div>
  )
}

export default Triangle
