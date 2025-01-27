import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mon",
    total: 40,
  },
  {
    name: "Tue",
    total: 30,
  },
  {
    name: "Wed",
    total: 45,
  },
  {
    name: "Thu",
    total: 50,
  },
  {
    name: "Fri",
    total: 60,
  },
  {
    name: "Sat",
    total: 55,
  },
  {
    name: "Sun",
    total: 35,
  },
]

export function UsageStatistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipment Usage</CardTitle>
        <CardDescription>Weekly equipment usage data</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

