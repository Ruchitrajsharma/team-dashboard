import { useSelector, useDispatch } from "react-redux"
import { updateMemberStatus } from "../redux/slices/membersSlice"
import StatusSelector from "./StatusSelector"
import TaskList from "./TaskList"
import { FiUser, FiCheckCircle, FiClock, FiTrendingUp } from "react-icons/fi"

const TeamMemberView = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.role)
  const { members } = useSelector((state) => state.members)

  // Find current user's data
  const currentMember = members.find((member) => member.name === currentUser)

  if (!currentMember) {
    return (
      <div className="text-center py-12">
        <FiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">User not found</h3>
        <p className="text-gray-500 dark:text-gray-400">Please contact your administrator.</p>
      </div>
    )
  }

  const handleStatusUpdate = (newStatus) => {
    dispatch(
      updateMemberStatus({
        memberId: currentMember.id,
        status: newStatus,
      }),
    )
  }

  const activeTasks = currentMember.tasks.filter((task) => !task.completed)
  const completedTasks = currentMember.tasks.filter((task) => task.completed)
  const totalProgress =
    currentMember.tasks.length > 0
      ? Math.round(currentMember.tasks.reduce((sum, task) => sum + task.progress, 0) / currentMember.tasks.length)
      : 0

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white dark:bg-cyan-800 rounded-lg shadow-sm border border-red-200 dark:border-red-700 p-6">
        <div className="flex items-center space-x-4">
          <img
            src={currentMember.avatar || "/placeholder.svg"}
            alt={currentMember.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, {currentMember.name}!</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your status and track your tasks</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Status</p>
            <span className={`status-badge status-${currentMember.status.toLowerCase()}`}>{currentMember.status}</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-sky-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Tasks</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{activeTasks.length}</p>
            </div>
            <FiClock className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-sky-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sky-600 dark:text-gray-400">Completed</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedTasks.length}</p>
            </div>
            <FiCheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-sky-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Progress</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalProgress}%</p>
            </div>
            <FiTrendingUp className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Update Section */}
        <div className="lg:col-span-1">
          <StatusSelector currentStatus={currentMember.status} onStatusChange={handleStatusUpdate} />
        </div>

        {/* Tasks Section */}
        <div className="lg:col-span-2">
          <TaskList tasks={currentMember.tasks} memberId={currentMember.id} />
        </div>
      </div>
    </div>
  )
}

export default TeamMemberView
