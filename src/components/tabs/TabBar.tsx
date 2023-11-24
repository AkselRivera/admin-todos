'use client'

import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  currentTab?: number
  tabOptions?: number[]
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4, 5],
}: Props) => {
  const [selected, setSelected] = useState(currentTab)
  const router = useRouter()

  function onTabSelected(tab: number) {
    setSelected(tab)
    setCookie('selectedTab', tab)
    router.refresh()
  }

  return (
    <div
      className={
        `grid w-full space-x-2 rounded-xl bg-gray-200 p-2 grid-cols-` +
        tabOptions.length
      }
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            checked={selected === tab}
            onChange={() => {}}
            key={tab}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  )
}
