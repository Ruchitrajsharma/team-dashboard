import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { assignTask, setStatusFilter } from "../redux/slices/membersSlice"
import MemberCard from "./MemberCard"
import TaskForm from "./TaskForm"
import StatusChart from "./StatusChart"
import MetricsCards from "./MetricsCards"
import { FiFilter, FiPlus, FiUsers } from "react-icons/fi"

const TeamLeadView = () => {
  const dispatch = useDispatch()
  const { members, statusFilter } = useSelector((state) => state.members)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [sortBy, setSortBy] = useState("name")

  const filteredMembers = members.filter((member) => statusFilter === "All" || member.status === statusFilter)

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "tasks") {
      const aActiveTasks = a.tasks.filter((task) => !task.completed).length
      const bActiveTasks = b.tasks.filter((task) => !task.completed).length
      return bActiveTasks - aActiveTasks
    }
    return a.name.localeCompare(b.name)
  })

  const handleAssignTask = (taskData) => {
    dispatch(assignTask(taskData))
    setShowTaskForm(false)
  }

  const statusOptions = ["All", "Working", "Meeting", "Break", "Offline"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor team status and assign tasks</p>
        </div>
        <button
          onClick={() => setShowTaskForm(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Assign Task
        </button>
      </div>

      <MetricsCards members={members} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="flex items-center space-x-2">
                  <FiFilter className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => dispatch(setStatusFilter(e.target.value))}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                >
                  <option value="name">Name</option>
                  <option value="tasks">Active Tasks</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedMembers.map((member) => (
              <MemberCard key={member.id} member={member} isLeadView={true} />
            ))}
          </div>

          {sortedMembers.length === 0 && (
            <div className="text-center py-12">
              <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No team members found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters to see more results.</p>
            </div>
          )}
        </div>

        <div className="xl:col-span-1">
          <StatusChart members={members} />
        </div>
      </div>

      {showTaskForm && (
        <TaskForm members={members} onSubmit={handleAssignTask} onClose={() => setShowTaskForm(false)} />
      )}
    </div>
  )
}

export default TeamLeadView
