import { useDispatch } from "react-redux"
import { updateTaskProgress } from "../redux/slices/membersSlice"
import { FiCalendar, FiCheckCircle, FiClock, FiPlus, FiMinus } from "react-icons/fi"

const TaskList = ({ tasks, memberId }) => {
  const dispatch = useDispatch()

  const handleProgressUpdate = (taskId, currentProgress, increment) => {
    const newProgress = Math.max(0, Math.min(100, currentProgress + increment))
    dispatch(
      updateTaskProgress({
        memberId,
        taskId,
        progress: newProgress,
      }),
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString()
  }

  const activeTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Tasks</h3>

      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <FiCheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks assigned</h4>
          <p className="text-gray-500 dark:text-gray-400">
            You're all caught up! New tasks will appear here when assigned.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Tasks */}
          {activeTasks.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <FiClock className="w-4 h-4 mr-2 text-orange-500" />
                Active Tasks ({activeTasks.length})
              </h4>
              <div className="space-y-4">
                {activeTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onProgressUpdate={(increment) => handleProgressUpdate(task.id, task.progress, increment)}
                    isOverdue={isOverdue(task.dueDate)}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <FiCheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Completed Tasks ({completedTasks.length})
              </h4>
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onProgressUpdate={() => {}} // No progress updates for completed tasks
                    isCompleted={true}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const TaskItem = ({ task, onProgressUpdate, isOverdue, isCompleted, formatDate }) => {
  return (
    <div
      className={`border rounded-lg p-4 ${isCompleted ? "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600" : "border-gray-200 dark:border-gray-600"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h5
            className={`font-medium ${isCompleted ? "text-gray-600 dark:text-gray-400 line-through" : "text-gray-900 dark:text-white"}`}
          >
            {task.title}
          </h5>
          <div className="flex items-center space-x-4 mt-1">
            <div
              className={`flex items-center space-x-1 text-sm ${
                isOverdue && !isCompleted ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <FiCalendar className="w-3 h-3" />
              <span>Due {formatDate(task.dueDate)}</span>
              {isOverdue && !isCompleted && (
                <span className="text-red-600 dark:text-red-400 font-medium">(Overdue)</span>
              )}
            </div>
          </div>
        </div>

        {isCompleted && <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{task.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              task.progress === 100 ? "bg-green-500" : "bg-blue-600"
            }`}
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      {/* Progress Controls */}
      {!isCompleted && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onProgressUpdate(-10)}
              disabled={task.progress <= 0}
              className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiMinus className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">Adjust progress</span>
            <button
              onClick={() => onProgressUpdate(10)}
              disabled={task.progress >= 100}
              className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlus className="w-4 h-4" />
            </button>
          </div>

          {task.progress < 100 && (
            <button
              onClick={() => onProgressUpdate(100 - task.progress)}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Mark Complete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default TaskList
