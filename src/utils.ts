import { RawValutes } from "./types"

export const getDifference = (a: number, b: number) => {
  const sign = ((a - b) < 0) ? '+' : "-"
  const difference = (100 * Math.abs((a - b) / ((a + b) / 2))).toPrecision(5)
  return `${sign}${difference}`
}

export const formatDate = (date: Date | number) => new Date(date).toISOString().slice(0, 10).replaceAll('-', '/')

export const parseValutes = (data: RawValutes) => Object.entries(data).map(arr => arr[1])