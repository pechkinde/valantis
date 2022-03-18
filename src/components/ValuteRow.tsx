import { FC, useState } from "react"
import { getDifference } from "../utils"
import React from 'react'
import { Valute } from "../types"

interface Props {
  valute: Valute
  onclick: () => void
}

export const ValuteRow: FC<Props> = ({ valute, onclick }) => {
  const [isHovered, setHovered] = useState(false)

  return (
    <tr onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onclick}
      className={`h-10 ${isHovered ? 'bg-neutral-200 relative' : ""}`}>
      <td className="text-center">{valute.CharCode}</td>
      <td className="text-center">{valute.Value}</td>
      <td className="text-center">
        {getDifference(valute.Previous, valute.Value)}
        {isHovered &&
          <div className="bg-black text-white px-4 py-2 rounded-lg absolute bottom-10 left-1/2 -translate-x-1/2">
            {valute.Nominal} {valute.Name}
          </div>
        }
      </td>
    </tr>
  )
}