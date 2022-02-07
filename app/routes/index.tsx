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
import Triangle, { TriangleSettings } from "~/components/triangle"
import { generateTriangle, Triangle as TTriangle } from "~/utils/math"

type LoaderData = {
  triangle: TTriangle
  size: number
  generator: number
  settings: TriangleSettings
}

export const loader: LoaderFunction = async ({ request }) => {
  const defaultSize = 15
  const defaultGenerator = 1
  let url = new URL(request.url)
  let size = Number(url.searchParams.get("size") || defaultSize)
  let generator = Number(url.searchParams.get("generator") || defaultGenerator)
  let settings: TriangleSettings = {
    showBases: url.searchParams.get("showBases") === "on",
    showBisector: url.searchParams.get("showBisector") === "on",
    rotate: url.searchParams.get("rotate") === "on",
    colorOdd: url.searchParams.get("colorOdd") === "on",
    hideValue: url.searchParams.get("hideValue") === "on",
    isScaled: url.searchParams.get("isScaled") === "on",
  }

  const triangle = generateTriangle(size, generator)
  const data: LoaderData = {
    triangle,
    size,
    generator,
    settings,
  }
  return json(data)
}

export default function Index() {
  const submit = useSubmit()
  const data = useLoaderData<LoaderData>()
  const formRef = React.useRef(null)
  const [sum, setSum] = React.useState<number>()
  const [product, setProduct] = React.useState<number>()

  const callback = (sum: number, product: number) => {
    setSum(sum)
    setProduct(product)
  }

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
              htmlFor="showBases"
            >
              <span>Bases</span>
              <input
                name="showBases"
                id="showBases"
                className="border rounded  p-2"
                type="checkbox"
                onChange={e => submitForm()}
                defaultChecked={data.settings.showBases}
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
                defaultChecked={data.settings.showBisector}
              />
            </label>
          </fieldset>
          <fieldset className="border p-2 flex flex-col w-32 space-y-1">
            <h3 className="font-bold ">Show</h3>
            <label
              className=" flex flex-row place-items-center justify-between"
              htmlFor="rotate"
            >
              <span>Rotate</span>
              <input
                name="rotate"
                id="rotate"
                className="border rounded  p-2"
                type="checkbox"
                onChange={e => submitForm()}
                defaultChecked={data.settings.rotate}
              />
            </label>
            <label
              className=" flex flex-row place-items-center justify-between"
              htmlFor="colorOdd"
            >
              <span>Color Odd</span>
              <input
                name="colorOdd"
                id="colorOdd"
                className="border rounded  p-2"
                type="checkbox"
                onChange={e => submitForm()}
                defaultChecked={data.settings.colorOdd}
              />
            </label>
          </fieldset>
          <fieldset className="border p-2 flex flex-col w-32 space-y-1">
            <h3 className="font-bold ">Show</h3>
            <label
              className=" flex flex-row place-items-center justify-between"
              htmlFor="hideValue"
            >
              <span>Hide Value</span>
              <input
                name="hideValue"
                id="hideValue"
                className="border rounded  p-2"
                type="checkbox"
                onChange={e => submitForm()}
                defaultChecked={data.settings.hideValue}
              />
            </label>
            <label
              className=" flex flex-row place-items-center justify-between"
              htmlFor="isScaled"
            >
              <span>isScaled</span>
              <input
                name="isScaled"
                id="isScaled"
                className="border rounded  p-2"
                type="checkbox"
                onChange={e => submitForm()}
                defaultChecked={data.settings.isScaled}
              />
            </label>
          </fieldset>
          <div className="border p-2  space-y-1">
            <div>
              Sum of Base: <b>{sum}</b>
            </div>
            <div>
              Product of Base: <b>{product}</b>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="rounded bg-green-600 text-gray-50 p-2 w-full mt-2"
        >
          Generate
        </button>
      </Form>
      <Triangle
        generator={data.generator}
        size={data.size}
        settings={data.settings}
        callback={callback}
      />
    </div>
  )
}
