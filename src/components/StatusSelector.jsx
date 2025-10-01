import { FiActivity, FiCoffee, FiVideo, FiMinus } from "react-icons/fi"

const StatusSelector = ({ currentStatus, onStatusChange }) => {
  const statusOptions = [
    {
      value: "Working",
      label: "Working",
      icon: FiActivity,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
      border: "border-green-200 dark:border-green-800",
      hoverBg: "hover:bg-green-100 dark:hover:bg-green-900/30",
    },
    {
      value: "Meeting",
      label: "In Meeting",
      icon: FiVideo,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-blue-200 dark:border-blue-800",
      hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
    },
    {
      value: "Break",
      label: "On Break",
      icon: FiCoffee,
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      hoverBg: "hover:bg-yellow-100 dark:hover:bg-yellow-900/30",
    },
    {
      value: "Offline",
      label: "Offline",
      icon: FiMinus,
      color: "text-gray-600 dark:text-gray-400",
      bg: "bg-gray-50 dark:bg-gray-800",
      border: "border-gray-200 dark:border-gray-700",
      hoverBg: "hover:bg-gray-100 dark:hover:bg-gray-700",
    },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Your Status</h3>
      <div className="space-y-3">
        {statusOptions.map((option) => {
          const Icon = option.icon
          const isActive = currentStatus === option.value

          return (
            <button
              key={option.value}
              onClick={() => onStatusChange(option.value)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                isActive
                  ? `${option.bg} ${option.border} ring-2 ring-blue-500 ring-opacity-20`
                  : `border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 ${option.hoverBg}`
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? option.color : "text-gray-400 dark:text-gray-500"}`} />
              <span className={`font-medium ${isActive ? option.color : "text-gray-700 dark:text-gray-300"}`}>
                {option.label}
              </span>
              {isActive && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Your status is visible to team leads and helps coordinate team activities.
        </p>
      </div>
    </div>
  )
}

export default StatusSelector