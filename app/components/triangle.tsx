import { generateTriangle } from "~/utils/math"

const Triangle = ({
  size = 5,
  generator = 1,
  settings: { showBase = false, showBisector = false },
}: {
  size: number
  generator: number
  settings: { showBisector: boolean; showBase: boolean }
}) => {
  const triangleData = generateTriangle(size, generator)
  return (
    <div className="triangle mt-4 flex flex-col">
      <div className="row flex flex-row">
        <div className="border-r w-6 border-b h-6 text-right"></div>
        {triangleData[0].map((cell, i) => (
          <div
            key={cell.id}
            className="border-r border-b w-14 h-6 text-right text-gray-300 pr-1 text-xs flex flex-col justify-end"
          >
            <span>{cell.perpendicularRow}</span>
          </div>
        ))}
      </div>
      {triangleData.map((row, rowNum) => (
        <div key={rowNum} className="row flex flex-row">
          <div className="border-b w-6 border-r h-14 text-center flex flex-col justify-end text-xs text-gray-300  ">
            <span>{row[0].parallelRow}</span>
          </div>
          {row.map((cell, colNum) => (
            <div
              key={cell.id}
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
              {showBisector && rowNum === colNum && (
                <div
                  data-type="bisector"
                  className="w-20 h-20 flex flex-col absolute top-4 -left-10 rotate-45"
                >
                  <hr className="bg-gray-400 " />
                </div>
              )}
              {showBase && (
                <div
                  data-type="base"
                  className="w-20 h-20 flex flex-col absolute top-4 left-4 -rotate-45"
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
