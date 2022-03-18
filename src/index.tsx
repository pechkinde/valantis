import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Overlay } from './components/Overlay'
import { ValuteRow } from './components/ValuteRow'
import './index.css'
import { Valute } from './types'
import { parseValutes } from './utils'

const App = () => {
  const [valutes, setValutes] = useState<Valute[]>([])
  const [selectedValute, selectValute] = useState<Valute | null>(null)

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(res => res.json()).then(res => {
      setValutes(parseValutes(res.Valute))
    })
  }, [])

  return (
    <div className="p-2 flex flex-col items-center">
      <h1 className="text-3xl font-medium m-2">Курсы валют</h1>
      <table className="m-2">
        <thead>
          <tr className="h-10">
            <th className="w-32">Код валюты</th>
            <th className="w-32">Значение, руб.</th>
            <th className="w-72">Разница с предыдущим днем, %</th>
          </tr>
        </thead>
        <tbody>
          {valutes.map((valute: Valute) => (
            <ValuteRow valute={valute} key={valute.ID} onclick={() => selectValute(valute)} />
          ))}
        </tbody>
      </table>
      {selectedValute && <Overlay valute={selectedValute} onclick={() => selectValute(null)} />}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
