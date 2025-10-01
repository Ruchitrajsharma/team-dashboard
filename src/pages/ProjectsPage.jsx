import { useState } from "react"
import { useSelector } from "react-redux"
import { FiPlus, FiCalendar, FiUsers, FiTrendingUp, FiFolder, FiMoreHorizontal, FiEdit3, FiEye } from "react-icons/fi"

const ProjectsPage = () => {
  const [filter, setFilter] = useState("all")
  const { currentRole, currentUser } = useSelector((state) => state.role)

  const projects = [
    {
      id: 1,
      name: "Web Redesign",
      description: "Complete redesign of the company website with modern UI/UX",
      status: "offline",
      progress: 63,
      startDate: "2023-12-01",
      endDate: "2024-02-15",
      teamMembers: ["Sarah Wilson", "Emily Chen", "Mike Johnson"],
      tasksCompleted: 15,
      totalTasks: 24,
      budget: "$25,000",
      color: "bg-yellow-500",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Native mobile application for iOS and Android platforms",
      status: "active",
      progress: 60,
      startDate: "2024-01-01",
      endDate: "2024-04-30",
      teamMembers: ["David Rodriguez", "Sarah Wilson"],
      tasksCompleted: 12,
      totalTasks: 20,
      budget: "$50,000",
      color: "bg-cyan-500",
    },
    {
      id: 3,
      name: "API Integration",
      description: "Integration with third-party APIs for enhanced functionality",
      status: "completed",
      progress: 100,
      startDate: "2023-11-15",
      endDate: "2023-12-30",
      teamMembers: ["David Rodriguez", "Mike Johnson"],
      tasksCompleted: 12,
      totalTasks: 12,
      budget: "$15,000",
      color: "bg-red-500",
    },
    {
      id: 4,
      name: "Security Checks",
      description: "Comprehensive security audit and vulnerability assessment",
      status: "planning",
      progress: 10,
      startDate: "2024-02-01",
      endDate: "2024-03-15",
      teamMembers: ["David Rodriguez"],
      tasksCompleted: 1,
      totalTasks: 10,
      budget: "$20,000",
      color: "bg-pink-500",
    },
  ]

  const filteredProjectsByRole =
    currentRole === "member" ? projects.filter((project) => project.teamMembers.includes(currentUser)) : projects

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400"

      case "completed":
        return "bg-green-100 text-teal-800 dark:bg-green-900/20 dark:text-teal-400"
      case "planning":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400"

      case "on-hold":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const filteredProjects = filteredProjectsByRole.filter((project) => {
    if (filter === "all") return true
    return project.status === filter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {currentRole === "lead" ? "Manage and track your team's projects" : "View projects you're involved in"}
          </p>
        </div>
        {currentRole === "lead" && (
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <FiPlus className="w-4 h-4 mr-2" />
            New Project
          </button>
        )}
      </div>

      <div className="flex space-x-4 mb-6">
        {["all", "active", "completed", "planning", "on-hold"].map((status) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full ${project.color} mt-2`}></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{project.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                {currentRole === "lead" ? (
                  <div className="flex space-x-1">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <FiMoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <FiEye className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${project.color}`}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <FiCalendar className="w-4 h-4" />
                  <span>{new Date(project.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <FiUsers className="w-4 h-4" />
                  <span>{project.teamMembers.length} members</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <FiFolder className="w-4 h-4" />
                  <span>
                    {project.tasksCompleted}/{project.totalTasks} tasks
                  </span>
                </div>
                {currentRole === "lead" && (
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <FiTrendingUp className="w-4 h-4" />
                    <span>{project.budget}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Team:</span>
                  <div className="flex -space-x-2">
                    {project.teamMembers.slice(0, 3).map((member, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium ${
                          member === currentUser
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {member
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    ))}
                    {project.teamMembers.length > 3 && (
                      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400">
                        +{project.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FiFolder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {currentRole === "member"
              ? "You're not assigned to any projects yet."
              : "No projects match the current filter."}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
