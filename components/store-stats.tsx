"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1500,
    sales: 12,
  },
  {
    name: "Feb",
    total: 2300,
    sales: 19,
  },
  {
    name: "Mar",
    total: 3200,
    sales: 25,
  },
  {
    name: "Apr",
    total: 4500,
    sales: 37,
  },
  {
    name: "May",
    total: 4900,
    sales: 42,
  },
  {
    name: "Jun",
    total: 5200,
    sales: 49,
  },
  {
    name: "Jul",
    total: 6000,
    sales: 55,
  },
  {
    name: "Aug",
    total: 5800,
    sales: 51,
  },
  {
    name: "Sep",
    total: 6300,
    sales: 60,
  },
  {
    name: "Oct",
    total: 6580,
    sales: 62,
  },
  {
    name: "Nov",
    total: 7500,
    sales: 71,
  },
  {
    name: "Dec",
    total: 9000,
    sales: 85,
  },
]

export function StoreStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} labelFormatter={(label) => `Month: ${label}`} />
      </BarChart>
    </ResponsiveContainer>
  )
}
