import React from 'react'

interface CardProps {
  title: string
  count: number
  icon: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, count, icon }) => {
  return (
    <div className="flex items-center gap-x-2 p-4 bg-white shadow rounded-lg border-2 border-[#333333]">
      {icon}
      <div>
        <h2 className="font-bold uppercase">{title}</h2>
        <p className="text-3xl">{count}</p>
      </div>
    </div>
  )
}

export default Card
