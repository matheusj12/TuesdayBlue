import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { PageHeader } from "@/components/page-header"
import { ChartCard } from "@/components/chart-card"
import { chartColors, chartTooltipStyle } from "@/components/chart-theme"
import {
  capacityData,
  cycleTimeData,
  leadTimeData,
  slaTrendData,
  statusDistribution,
  velocityData,
} from "@/mock"

const pieColors = [chartColors.muted, chartColors.accent, chartColors.primary, chartColors.warning, chartColors.danger, chartColors.success]

export default function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="Delivery, quality and capacity analytics across the workspace." />

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-2">
        <ChartCard title="Velocity" subtitle="Story points completed per sprint">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={velocityData} margin={{ left: -20, top: 8 }}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="value" fill={chartColors.accent} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cycle Time vs Lead Time" subtitle="Days, rolling weekly average">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart margin={{ left: -20, top: 8 }} data={cycleTimeData.map((d, i) => ({ ...d, lead: leadTimeData[i]?.value }))}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Line type="monotone" dataKey="value" name="Cycle time" stroke={chartColors.primary} strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="lead" name="Lead time" stroke={chartColors.warning} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="SLA Compliance Trend" subtitle="Percentage of tasks resolved within SLA">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={slaTrendData} margin={{ left: -20, top: 8 }}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} domain={[85, 100]} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Line type="monotone" dataKey="value" stroke={chartColors.success} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Team Capacity" subtitle="Allocated vs available capacity by squad">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={capacityData} layout="vertical" margin={{ left: 0, top: 8 }}>
              <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="label" type="category" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} width={80} />
              <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="value" fill={chartColors.primary} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Task Status Distribution" subtitle="All active boards" className="lg:col-span-2">
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="50%" height={260}>
              <PieChart>
                <Pie data={statusDistribution} dataKey="value" nameKey="label" innerRadius={60} outerRadius={100} paddingAngle={2}>
                  {statusDistribution.map((entry, index) => (
                    <Cell key={entry.label} fill={pieColors[index % pieColors.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {statusDistribution.map((entry, index) => (
                <div key={entry.label} className="flex items-center gap-2 text-sm">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: pieColors[index % pieColors.length] }}
                  />
                  <span className="text-text-secondary">{entry.label}</span>
                  <span className="ml-auto font-medium text-text-primary">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
