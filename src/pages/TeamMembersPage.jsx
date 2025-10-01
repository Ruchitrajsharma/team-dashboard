import { useSelector } from "react-redux"
import { FiUsers, FiMail, FiPhone, FiMapPin, FiCalendar } from "react-icons/fi"

const TeamMembersPage = () => {
  const { members } = useSelector((state) => state.members)

  const teamMembers = [
    {
      id: 1,
      name: "Rooni",
      email: "rooni@company.com",
      phone: "+1 (555) 123-4567",
      role: "Senior Developer",
      department: "Engineering",
      location: "England",
      joinDate: "Jan 2023",
      avatar: "/professional-woman-diverse.png",
      status: "Working",
    },
    {
      id: 2,
      name: "Mike Johnson",
      email: "mike@company.com",
      phone: "+1 (555) 987-6543",
      role: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      joinDate: "Mar 2022",
      avatar: "/professional-man.png",
      status: "Meeting",
    },
    {
      id: 3,
      name: "Moony Yen",
      email: "moony@company.com",
      phone: "+1 (555) 456-7890",
      role: "UX Designer",
      department: "Design",
      location: "China",
      joinDate: "Jun 2023",
      avatar: "/professional-woman-designer.png",
      status: "Break",
    },
    {
      id: 4,
      name: "David Rodriguez",
      email: "david@company.com",
      phone: "+1 (555) 321-0987",
      role: "DevOps Engineer",
      department: "Engineering",
      location: "Seattle, WA",
      joinDate: "Sep 2022",
      avatar: "/professional-engineer.png",
      status: "Working",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Working":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "Break":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Offline":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900 dark:text-rose-200">Team Members</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage and view your team members</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <FiUsers className="w-4 h-4" />
          <span>{teamMembers.length} members</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-gray dark:bg-cyan-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <img
                src={member.avatar || "/placeholder.svg"}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{member.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-yellow-400 mb-1">{member.role}</p>
                <p className="text-xs text-red-500 dark:text-red-500 mb-4">{member.department}</p>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-rose-600 dark:text-rose-400">
                    <FiMail className="w-4 h-4" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-rose-400">
                    <FiPhone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-rose-400">
                    <FiMapPin className="w-4 h-4" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-rose-400">
                    <FiCalendar className="w-4 h-4" />
                    <span>Joined {member.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TeamMembersPage
