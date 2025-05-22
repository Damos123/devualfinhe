"use client"

import { useEffect, useState } from "react"

interface TableRow {
  day: string
  focus: string
  time: string
  goal: string
}

interface ResponsiveTableProps {
  data: TableRow[]
}

export function ResponsiveTable({ data }: ResponsiveTableProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar inicialmente
    checkIfMobile()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkIfMobile)

    // Limpar listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="space-y-6">
        {data.map((row, index) => (
          <div key={index} className="rounded-lg border bg-background p-4 shadow-sm">
            <div className="font-bold text-lg mb-2">{row.day}</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">Foco:</div>
              <div>{row.focus}</div>
              <div className="font-medium">Tempo:</div>
              <div>{row.time}</div>
              <div className="font-medium">Objetivo:</div>
              <div>{row.goal}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left font-medium">Dia</th>
            <th className="py-2 px-4 text-left font-medium">Foco</th>
            <th className="py-2 px-4 text-left font-medium">Tempo</th>
            <th className="py-2 px-4 text-left font-medium">Objetivo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b">
              <td className="py-3 px-4">{row.day}</td>
              <td className="py-3 px-4">{row.focus}</td>
              <td className="py-3 px-4">{row.time}</td>
              <td className="py-3 px-4">{row.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
