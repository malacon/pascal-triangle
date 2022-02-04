import * as React from "react"
import { Link } from "react-router-dom"
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useSubmit,
} from "remix"
import { generateTriangle, Triangle } from "~/utils/math"

type LoaderData = {
  triangle: Triangle
  size: number
  generator: number
  showBase: boolean
  showBisector: boolean
}

export const loader: LoaderFunction = async ({ request }) => {
  const defaultSize = 15
  const defaultGenerator = 1
  let url = new URL(request.url)
  let size = Number(url.searchParams.get("size") || defaultSize)
  let generator = Number(url.searchParams.get("generator") || defaultGenerator)
  let showBase = url.searchParams.get("showBase") === "on"
  let showBisector = url.searchParams.get("showBisector") === "on"

  const triangle = generateTriangle(size, generator)
  const data: LoaderData = {
    triangle,
    size,
    generator,
    showBase,
    showBisector,
  }
  return json(data)
}

export default function Index() {
  const submit = useSubmit()
  const data = useLoaderData<LoaderData>()
  const formRef = React.useRef(null)

  const submitForm = () => {
    submit(formRef.current)
  }

  return (
    <div className="container p-6">
      <header className="flex flex-row place-items-end space-x-2">
        <h1 className="font-bold text-2xl">Pascal's Triangle</h1>
        <span>
          (
          <a
            className="text-blue-700 underline"
            target="_blank"
            href="https://web.nmsu.edu/~davidp/hist_projects/pascalII.pdf"
          >
            original text, pdf
          </a>
          )
        </span>
        <span>
          (
          <Link className="text-blue-700 underline" to="text">
            Interactive Text
          </Link>
          )
        </span>
      </header>
      <Form ref={formRef} method="get" className="w-fit">
        <div className="flex flex-row space-x-2">
          <fieldset className="border p-2 flex flex-col w-20 space-y-1">
            <label className="font-bold" htmlFor="size">
              Size
            </label>
            <input
              name="size"
              id="size"
              className="border rounded w-20 p-2"
              type="number"
              min={1}
              defaultValue={data.size}
            />
          </fieldset>
          <fieldset className="border p-2 flex flex-col w-20 space-y-1">
            <label className="font-bold" htmlFor="generator">
              Generator
            </label>
            <input
              name="generator"
              id="generator"
              className="border rounded w-20 p-2"
              type="number"
              min={1}
              defaultValue={data.generator}
            />
          </fieldset>
          <fieldset className="border p-2 flex flex-col w-32 space-y-1">
            <h3 className="font-bold ">Show</h3>
            <label
              className=" flex flex-row place-items-center justify-between"
              htmlFor="showBase"
            >
              <span>Bases</span>
              <input
                name="showBase"
                id="showBase"
                className="border rounded  p-2"
                type="checkbox"
                onChange={e => submitForm()}
                defaultChecked={data.showBase}
              />
            </label>
            <label
              className=" flex flex-row place-items-center justify-between"
              htmlFor="showBisector"
            >
              <span>Bisector</span>
              <input
                name="showBisector"
                id="showBisector"
                className="border rounded p-2"
                type="checkbox"
                onChange={e => submitForm()}
                defaultChecked={data.showBisector}
              />
            </label>
          </fieldset>
        </div>
        <button
          type="submit"
          className="rounded bg-green-600 text-gray-50 p-2 w-full mt-2"
        >
          Generate
        </button>
      </Form>
      <div className="triangle mt-4 flex flex-col">
        <div className="row flex flex-row">
          <div className="border-r w-6 border-b h-6 text-right"></div>
          {data.triangle[0].map((cell, i) => (
            <div
              key={cell.id}
              className="border-r border-b w-14 h-6 text-right text-gray-300 pr-1 text-xs flex flex-col justify-end"
            >
              <span>{cell.perpendicularRow}</span>
            </div>
          ))}
        </div>
        {data.triangle.map((row, rowNum) => (
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
                {data.showBisector && rowNum - 1 === colNum && (
                  <div className="w-20 h-20 flex flex-col absolute bottom-4 right-4 rotate-45">
                    <hr className="bg-gray-400 " />
                  </div>
                )}
                {data.showBase && (
                  <div className="w-20 h-20 flex flex-col absolute top-4 left-4 -rotate-45">
                    <hr className="bg-gray-400 " />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
