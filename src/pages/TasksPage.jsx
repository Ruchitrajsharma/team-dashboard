import { useState } from "react"
import { useSelector } from "react-redux"
import { FiPlus, FiCalendar, FiUser, FiClock, FiCheckCircle, FiCircle, FiEdit3, FiTrash2 } from "react-icons/fi"

const TasksPage = () => {
  const [filter, setFilter] = useState("all")
  const { currentRole, currentUser } = useSelector((state) => state.role)

  const tasks = [
    {
      id: 1,
      title: "Update documentation",
      description: "Review and update the API documentation for the new features",
      assignee: "Sarah Wilson",
      dueDate: "2024-01-15",
      priority: "high",
      status: "in-progress",
      progress: 60,
    },
    {
      id: 2,
      title: "Review project proposal",
      description: "Review the Q1 project proposal and provide feedback",
      assignee: "Mike Johnson",
      dueDate: "2024-01-12",
      priority: "medium",
      status: "completed",
      progress: 100,
    },
    {
      id: 3,
      title: "Design system updates",
      description: "Update the design system components for better accessibility",
      assignee: "Emily Chen",
      dueDate: "2024-01-20",
      priority: "low",
      status: "todo",
      progress: 0,
    },
    {
      id: 4,
      title: "Server maintenance",
      description: "Perform routine server maintenance and security updates",
      assignee: "David Rodriguez",
      dueDate: "2024-01-18",
      priority: "high",
      status: "in-progress",
      progress: 30,
    },
  ]

  const filteredTasksByRole = currentRole === "member" ? tasks.filter((task) => task.assignee === currentUser) : tasks

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FiCheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <FiClock className="w-5 h-5 text-blue-500" />
      case "todo":
        return <FiCircle className="w-5 h-5 text-gray-400" />
      default:
        return <FiCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const filteredTasks = filteredTasksByRole.filter((task) => {
    if (filter === "all") return true
    return task.status === filter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {currentRole === "lead" ? "Manage and track your team's tasks" : "View and manage your assigned tasks"}
          </p>
        </div>
        {currentRole === "lead" && (
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <FiPlus className="w-4 h-4 mr-2" />
            Add Task
          </button>
        )}
      </div>

      <div className="flex space-x-4 mb-6">
        {["all", "todo", "in-progress", "completed"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                {getStatusIcon(task.status)}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{task.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <FiUser className="w-4 h-4" />
                      <span>{task.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                {(currentRole === "lead" || task.assignee === currentUser) && (
                  <div className="flex space-x-1">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                    {currentRole === "lead" && (
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {task.status === "in-progress" && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <FiCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {currentRole === "member" ? "You don't have any tasks assigned yet." : "No tasks match the current filter."}
          </p>
        </div>
      )}
    </div>
  )
}

export default TasksPage
