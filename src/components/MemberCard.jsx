import { FiMail, FiCheckCircle, FiClock } from "react-icons/fi"

const MemberCard = ({ member, isLeadView = false }) => {
  const getStatusBadgeClass = (status) => {
    const classes = {
      Working: "status-working",
      Meeting: "status-meeting",
      Break: "status-break",
      Offline: "status-offline",
    }
    return `status-badge ${classes[status] || "status-offline"}`
  }

  const activeTasks = member.tasks.filter((task) => !task.completed)
  const completedTasks = member.tasks.filter((task) => task.completed)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-lg transition-shadow">
      {" "}
      {/* Added dark mode background and border */}
      {/* Member Info */}
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={member.avatar || "/placeholder.svg"}
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3> {/* Added dark mode text */}
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            {" "}
            {/* Added dark mode text */}
            <FiMail className="w-3 h-3" />
            <span>{member.email}</span>
          </div>
        </div>
      </div>
      {/* Status Badge */}
      <div className="mb-4">
        <span className={getStatusBadgeClass(member.status)}>{member.status}</span>
      </div>
      {/* Task Summary */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tasks</span> {/* Added dark mode text */}
          <span className="font-medium text-gray-900 dark:text-white">{member.tasks.length} total</span>{" "}
          {/* Added dark mode text */}
        </div>

        {activeTasks.length > 0 && (
          <div className="flex items-center space-x-2 text-sm">
            <FiClock className="w-3 h-3 text-orange-500" />
            <span className="text-orange-600 dark:text-orange-400">{activeTasks.length} active</span>{" "}
            {/* Added dark mode text */}
          </div>
        )}

        {completedTasks.length > 0 && (
          <div className="flex items-center space-x-2 text-sm">
            <FiCheckCircle className="w-3 h-3 text-green-500" />
            <span className="text-green-600 dark:text-green-400">{completedTasks.length} completed</span>{" "}
            {/* Added dark mode text */}
          </div>
        )}
      </div>
      {/* Recent Tasks Preview (for lead view) */}
      {isLeadView && activeTasks.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          {" "}
          {/* Added dark mode border */}
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">ACTIVE TASKS</p>{" "}
          {/* Added dark mode text */}
          <div className="space-y-1">
            {activeTasks.slice(0, 2).map((task) => (
              <div key={task.id} className="text-sm">
                <p className="text-gray-700 dark:text-gray-300 truncate">{task.title}</p> {/* Added dark mode text */}
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1">
                    {" "}
                    {/* Added dark mode background */}
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-1 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />{" "}
                    {/* Added dark mode color */}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{task.progress}%</span>{" "}
                  {/* Added dark mode text */}
                </div>
              </div>
            ))}
            {activeTasks.length > 2 && (
              <p className="text-xs text-gray-500 dark:text-gray-400">+{activeTasks.length - 2} more</p>
            )}{" "}
            {/* Added dark mode text */}
          </div>
        </div>
      )}
    </div>
  )
}

export default MemberCard
