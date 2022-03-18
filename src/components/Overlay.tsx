import React, { FC, useEffect, useState } from 'react'
import { Valute } from '../types'
import { formatDate, getDifference, parseValutes } from '../utils'

interface Props {
  valute: Valute
  onclick: () => void
}

export const Overlay: FC<Props> = ({ valute, onclick }) => {
  const [valutes, setValutes] = useState<Valute[]>([])
  const date = new Date()

  let i = 1

  const fetchData = () => {
    const dateBefore = formatDate(new Date(date).setDate(date.getDate() - i))
    fetch(`https://www.cbr-xml-daily.ru/archive/${dateBefore}/daily_json.js`).then(res => res.json()).then(res => {
      setValutes(valutes => [...valutes, parseValutes(res.Valute).find(rawValute => rawValute.ID === valute.ID)])
    })
  }

  const throttleFetch = () => {
    let timeout = setTimeout(() => {
      fetchData()
      i++
      if (i < 4) {
        throttleFetch()
      }
    }, 200)
    return () => {
      clearTimeout(timeout)
    }
  }

  useEffect(() => {
    throttleFetch()
  }, [])

  return (
    <div className="w-screen h-screen bg-neutral-500 bg-opacity-50 fixed top-0 left-0 flex items-center justify-center"
      onClick={onclick}>
      <div className="bg-white rounded-lg p-2 flex flex-col items-center">
        <h1 className="text-xl font-medium m-2">{valute.Nominal} {valute.Name}</h1>
        <p className="m-2 max-w-prose text-red-600"><a className="underline" href="https://www.cbr-xml-daily.ru/">API для курсов ЦБ РФ </a>
          не предоставляет возможность получения данных за неделю или месяц, а получение данных за конкретную дату ограничивает пятью запросами за итерацию, поэтому получить данные наиболее простым способом можно только за 4 дня.</p>
        <table>
          <thead>
            <tr className="h-10">
              <th className="w-32">Дата</th>
              <th className="w-32">Значение, руб.</th>
              <th className="w-72">Разница с предыдущим днем, %</th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-10">
              <td className="text-center">{formatDate(Date.now())}</td>
              <td className="text-center">{valute.Value}</td>
              <td className="text-center">{getDifference(valute.Previous, valute.Value)}</td>
            </tr>
            {valutes.map((valute, index) =>
              <tr className="h-10" key={index}>
                <td className="text-center">{formatDate(new Date(date).setDate(date.getDate() - (index + 1)))}</td>
                <td className="text-center">{valute.Value}</td>
                <td className="text-center">{getDifference(valute.Previous, valute.Value)}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>)
}