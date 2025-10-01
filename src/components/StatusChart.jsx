import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const StatusChart = ({ members }) => {
  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    percentage: ((count / members.length) * 100).toFixed(1),
  }))

  const COLORS = {
    Working: "#10b981", // green-500
    Meeting: "#3b82f6", // blue-500
    Break: "#f59e0b", // amber-500
    Offline: "#6b7280", // gray-500
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {data.payload.name}: {data.value} members
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{data.payload.percentage}% of team</p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {entry.value} ({chartData.find((d) => d.name === entry.value)?.percentage}%)
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <div className="mb-2 sm:mb-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Status</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Current team distribution</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{members.length}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Members</p>
        </div>
      </div>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius="35%"
              outerRadius="65%"
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} wrapperStyle={{ paddingTop: "20px" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default StatusChart
