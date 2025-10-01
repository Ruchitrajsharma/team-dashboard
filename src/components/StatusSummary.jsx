import { FiActivity, FiCoffee, FiVideo, FiMinus } from "react-icons/fi"

const StatusSummary = ({ members }) => {
  const statusCounts = members.reduce((acc, member) => {
    acc[member.status] = (acc[member.status] || 0) + 1
    return acc
  }, {})

  const statusConfig = {
    Working: {
      icon: FiActivity,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
    },
    Meeting: {
      icon: FiVideo,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
    },
    Break: {
      icon: FiCoffee,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
    },
    Offline: {
      icon: FiMinus,
      color: "text-gray-600 dark:text-gray-400",
      bg: "bg-gray-50 dark:bg-gray-800",
      border: "border-gray-200 dark:border-gray-700",
    },
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(statusConfig).map(([status, config]) => {
        const Icon = config.icon
        const count = statusCounts[status] || 0

        return (
          <div key={status} className={`${config.bg} ${config.border} border rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{status}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
              </div>
              <Icon className={`w-6 h-6 ${config.color}`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatusSummary
