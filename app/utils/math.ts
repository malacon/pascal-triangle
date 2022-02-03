export type Cell = {
  id: string
  value: number
  parallelRow: number
  perpendicularRow: number
}
export type Triangle = Array<Array<Cell>>

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
  const newId = getNameFromNumber(currentId)
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
