export type Cell = {
  id: string
  value: number
  parallelRow: number
  perpendicularRow: number
}
export type Cell2 = {
  id: string
  value: number
  isSelected: boolean
  color: string
  parallelRow: number
  perpendicularRow: number
}
export type Triangle = Array<Array<Cell>>
export type Triangle2 = Array<Array<Cell2>>

const generateCell = (
  parallelRow: number,
  perpendicularRow: number,
  generator: number = 1
) => {
  const numberOfRows = perpendicularRow - 1
  const perpendicularProduct = new Array(numberOfRows)
    .fill(0)
    .reduce((product, _, i) => product * (i + 1), 1)
  const parallelProduct = new Array(numberOfRows)
    .fill(0)
    .reduce((product, _, i) => product * (i + parallelRow), 1)
  return (parallelProduct / perpendicularProduct) * generator
}

/***
 * 213
 *   213 % 26 --> 5
 *     (213 - (213 % 26) % 26) -->
 */

// 65-90
let currentId = 1
const getNameFromNumber = (num: number): string => {
  let numeric = (num - 1) % 26
  let letter = String.fromCharCode(65 + numeric)
  let num2 = Math.floor((num - 1) / 26)
  if (num2 > 0) {
    return getNameFromNumber(num2) + letter
  } else {
    return letter
  }
}
const generateId = () => {
  let newId
  if (currentId === 7) currentId++
  if (currentId === 1) {
    newId = getNameFromNumber(7)
  } else {
    newId = getNameFromNumber(currentId)
  }

  currentId++
  return newId
}

export const generateTriangle = (
  size: number = 5,
  generator: number = 1
): Triangle => {
  currentId = 1
  let tri = []
  for (let row = size; row >= 1; row--) {
    let currRow = []
    for (let col = 1; col <= row; col++) {
      currRow.push({
        id: generateId(),
        value: generateCell(size - row + 1, col, generator),
        parallelRow: size - row + 1,
        perpendicularRow: col,
      })
    }
    tri.push(currRow)
  }
  return tri
}

export const getParallelRowCells = (triangle: Triangle, exp: number) => {
  return triangle[exp - 1]
}

export const getPerpendicularRowCells = (triangle: Triangle, exp: number) => {
  return triangle.map(row => row[exp - 1]).filter(c => c)
}

export const getBaseRowCells = (triangle: Triangle, exp: number) => {
  const cells = new Array(exp).fill(0).map((_, i) => {
    return triangle[i][exp - 1 - i]
  })
  return cells
}

type TriangleGeneratorProps = {
  size?: number
  generator?: number
  selectedCells?: Array<{ id: string; color: string }>
  bisector?: boolean
  showBases?: Array<number> | "all"
}
export const generateTriangle2 = ({
  size = 5,
  generator = 1,
  selectedCells,
  bisector = false,
  showBases,
}: TriangleGeneratorProps): Triangle2 => {
  currentId = 1
  let tri = []
  for (let row = size; row >= 1; row--) {
    let currRow: Cell2[] = []
    for (let col = 1; col <= row; col++) {
      const id = generateId()
      const selected = selectedCells?.find(s => s.id === id)
      currRow.push({
        id,
        isSelected: Boolean(selected),
        color: selected?.color || "white",
        value: generateCell(size - row + 1, col, generator),
        parallelRow: size - row + 1,
        perpendicularRow: col,
      })
    }
    tri.push(currRow)
  }
  return tri
}
