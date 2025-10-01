import { FiUsers, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi"

const MetricsCards = ({ members }) => {
  const totalMembers = members.length
  const workingMembers = members.filter((m) => m.status === "Working").length
  const totalTasks = members.reduce((acc, member) => acc + member.tasks.length, 0)
  const completedTasks = members.reduce((acc, member) => acc + member.tasks.filter((task) => task.completed).length, 0)

  const metrics = [
    {
      title: "Total Team Members",
      value: totalMembers,
      icon: FiUsers,
      color: "bg-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Currently Working",
      value: workingMembers,
      icon: FiClock,
      color: "bg-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: FiCheckCircle,
      color: "bg-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: FiAlertCircle,
      color: "bg-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className={`${metric.bgColor} rounded-xl p-6 border border-gray-200 dark:border-gray-700`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{metric.title}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
            </div>
            <div className={`${metric.color} p-3 rounded-lg`}>
              <metric.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MetricsCards
