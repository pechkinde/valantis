export interface Valute {
  ID: string
  NumCode: string
  CharCode: string
  Nominal: number
  Name: string
  Previous: number
  Value: number
}

export interface RawValutes {
  name: string,
  valute: Valute
}