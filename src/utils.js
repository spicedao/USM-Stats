//import { BigNumber } from "ethers"

export const colours = [
  '#00ff44',
  '#aaff00',
  '#fbff00',
  '#ffe100',
  '#ffc400',
  '#ff9d00',
  '#ff8400',
  '#ff5900',
  '#d6363680'
]

export const maximumApprove = "115792089237316195423570985008687907853269984665640564039457"; // Equivalent to (2^256 - 1)

export const colorisor = (actualNumber, ranges) => {
  if (actualNumber <= ranges[0]) {
    return colours[0]
  }
  else if (actualNumber > ranges[0] && actualNumber <= ranges[1]) {
    return colours[1]
  }
  else if (actualNumber > ranges[1] && actualNumber <= ranges[2]) {
    return colours[2]
  }
  else if (actualNumber > ranges[2] && actualNumber <= ranges[3]) {
    return colours[3]
  }
  else if (actualNumber > ranges[3] && actualNumber <= ranges[4]) {
    return colours[4]
  }
  else if (actualNumber > ranges[4] && actualNumber <= ranges[5]) {
    return colours[5]
  }
  else if (actualNumber > ranges[5] && actualNumber <= ranges[6]) {
    return colours[6]
  }
  else if (actualNumber > ranges[6] && actualNumber <= ranges[7]) {
    return colours[7]
  }
  else if (actualNumber > ranges[7]) {
    return colours[8]
  }
}

export const usmPriceHighlight = (price, referencePrice) => {
  const difference = Math.abs(1 - referencePrice / Number.parseFloat(price))
  const ranges = [.02, .04, .06, .09, .12, .18, .22, .27]
  return colorisor(difference, ranges)
}

export const debtRatioHighlight = (debtRatio) => {
  const ranges = [.5, .6, .65, .7, .725, .75, .775, .8]
  return colorisor(debtRatio, ranges)
}

export const oracleHighlight = (referencePrice, actualPrice) => {
  const difference = Math.abs(1 - Number.parseFloat(referencePrice) / Number.parseFloat(actualPrice))
  const ranges = [.02, .04, .06, .08, .1, .14, .18, .25]
  return colorisor(difference, ranges)
}

export const decimalPlaces = (numberString, decimals = 2) => {
  return Number(
    Number.parseFloat(numberString).toFixed(decimals)
  ).toLocaleString(undefined, {minimumFractionDigits: decimals, maximumFractionDigits: decimals})
}

export const toPercentage = (decimalString) => {
  const num = Number.parseFloat(decimalString) * 100
  return decimalPlaces(num.toString())
}

export const stringMul = (a, b) => {
  return (Number.parseFloat(a) * Number.parseFloat(b))
}

export function wtoe(yoctoString) {
  let result = (yoctoString + "").padStart(19, "0")
  result = result.slice(0, -18) + "." + result.slice(-18)
  return result
}
