// export const highlightExponents = () => {
//   const exponents = document.getElementsByClassName("exponent")
//   for (let exponent of exponents) {
//     exponent.classList.toggle("font-bold")
//     exponent.classList.toggle("text-gray-900")
//     exponent.classList.toggle("text-base")
//   }
// }

// export const highlightCell = (id: string) => () => {
//   const cell = document.getElementById(`cell-${id}`)
//   cell?.classList.toggle("bg-orange-300")
// }
// export const highlightCells = (ids: string[]) => () => {
//   ids.forEach(id => {
//     const cell = document.getElementById(`cell-${id}`)
//     cell?.classList.toggle("bg-orange-300")
//   })
// }
// export const highlightCellsAdd = (addendsIds: string[], sumId: string) => () => {
//   addendsIds.forEach(id => {
//     const cell = document.getElementById(`cell-${id}`)
//     cell?.classList.toggle("bg-orange-300")
//   })
//   const cell = document.getElementById(`cell-${sumId}`)
//   cell?.classList.toggle("bg-green-300")
// }
// export const highlightParallelRow = (exp: number) => () => {
//   const row = getParallelRowCells(triangleData, exp)
//   row.forEach(cell => highlightCell(cell.id)())
// }
// export const highlightPerpendicularRow = (exp: number) => () => {
//   const row = getPerpendicularRowCells(triangleData, exp)
//   row.forEach(cell => highlightCell(cell.id)())
// }
// export const highlightParallelAndPerpendicularRows = (cellId: string) => () => {
//   const cell = triangleData.reduce<Cell | null>((cell, row) => {
//     if (cell) return cell
//     const t = row.reduce<Cell | null>((cell, currentCell) => {
//       if (cell) return cell
//       if (currentCell.id === cellId) return currentCell
//       return cell
//     }, null)
//     return t
//   }, null)
//   highlightPerpendicularRow(cell?.perpendicularRow || 0)()
//   highlightParallelRow(cell?.parallelRow || 0)()
//   highlightCell(cellId)()
// }
// export const highlightBaseRow = (exp: number) => () => {
//   const row = getBaseRowCells(triangleData, exp)
//   row.forEach(cell => highlightCell(cell.id)())
// }
// export const highlightLargerBases = (exp: number) => () => {
//   highlightBaseRow(exp)
//   highlightBaseRow(exp - 1)
// }
// export const perpendicularExponentBase = (cellId: string) => () => {
//   highlightCell(cellId)()
//   const cell = document.getElementById(`cell-${cellId}`)
//   const parallelRow = cell?.dataset.parallelRow
//   const perpendicularRow = cell?.dataset.perpendicularRow
//   const exponents = document.getElementsByClassName("exponent")
//   setToggleBase(num =>
//     num ? undefined : Number(parallelRow) + Number(perpendicularRow) - 1
//   )

//   for (let exponent of exponents) {
//     let exp = exponent as HTMLElement
//     if (
//       (exp.dataset.type === "exponent-parallelRow" &&
//         exp.dataset.value === parallelRow) ||
//       (exp.dataset.type === "exponent-perpendicularRow" &&
//         exp.dataset.value === perpendicularRow)
//     ) {
//       exp.classList.toggle("text-2xl")
//       exp.classList.toggle("text-gray-900")
//     }
//     if (
//       exp.dataset.type === "exponent-parallelRow" &&
//       Number(exp.dataset.value) ===
//         Number(perpendicularRow) + Number(parallelRow) - 1
//     ) {
//       exp.classList.toggle("text-2xl")
//       exp.classList.toggle("text-green-500")
//     }
//   }
// }

// export const highlightTriangle = (exp: number) => () => {
//   triangleData.slice(0, exp).map((row, i) =>
//     row.slice(0, exp - i).forEach((cell, j) => {
//       const currentCell = document.getElementById(`cell-${cell.id}-triangle`)
//       if (cell.parallelRow + j < exp) {
//         currentCell?.classList.toggle("full-square")
//       } else {
//         currentCell?.classList.toggle("bottom-triangle")
//       }
//       currentCell?.classList.toggle("hidden")
//     })
//   )
// }
