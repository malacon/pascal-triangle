import * as React from "react"
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
}

export const loader: LoaderFunction = async ({ request }) => {
  const defaultSize = 15
  const defaultGenerator = 1
  let url = new URL(request.url)
  let size = Number(url.searchParams.get("size") || defaultSize)
  let generator = Number(url.searchParams.get("generator") || defaultGenerator)
  let showBase = url.searchParams.get("showBase") === "on"

  const triangle = generateTriangle(size, generator)
  const data: LoaderData = {
    triangle,
    size,
    generator,
    showBase,
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

  // console.log(data)
  return (
    <div className="container p-6">
      <h1 className="font-bold text-2xl">Pascal's Triangle</h1>
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
          <fieldset className="border p-2 flex flex-col w-20 space-y-1">
            <label className="font-bold" htmlFor="showBase">
              Show Bases
            </label>
            <input
              name="showBase"
              id="showBase"
              className="border rounded w-20 p-2"
              type="checkbox"
              onChange={e => submitForm()}
              defaultChecked={data.showBase}
            />
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
        {data.triangle.map((row, i) => (
          <div key={i} className="row flex flex-row">
            <div className="border-b w-6 border-r h-14 text-center flex flex-col justify-end text-xs text-gray-300  ">
              <span>{row[0].parallelRow}</span>
            </div>
            {row.map(cell => (
              <div
                key={cell.id}
                className="cell border-r border-b p-0 m-0 w-14 h-14 text-center relative"
              >
                <div className="w-14 h-14 flex flex-col absolute top-0 left-0">
                  <span>{cell.id}</span>
                  <span className="absolute left-1/2 top-1/2">
                    {cell.value}
                  </span>
                </div>
                {data.showBase && (
                  <div className="w-20 h-20 flex flex-col absolute top-4 left-4 -rotate-45">
                    <hr className=" " />
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
