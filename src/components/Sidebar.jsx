import { useSelector, useDispatch } from "react-redux"
import { FiHome, FiUsers, FiClipboard, FiSettings, FiCheckSquare, FiX } from "react-icons/fi"
import { setCurrentPage } from "../redux/slices/navigationSlice"

const Sidebar = ({ onClose }) => {
  const dispatch = useDispatch()
  const { currentRole } = useSelector((state) => state.role)
  const { currentPage } = useSelector((state) => state.navigation)

  const menuItems = [
    { icon: FiHome, label: "Dashboard", id: "dashboard" },
    { icon: FiUsers, label: "Team Members", id: "team" },
    { icon: FiClipboard, label: "Tasks", id: "tasks" },
    { icon: FiCheckSquare, label: "Projects", id: "projects" },
    { icon: FiSettings, label: "Settings", id: "settings" },
  ]

  const handleItemClick = (item) => {
    dispatch(setCurrentPage(item.id))
    if (onClose) onClose()
  }

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-screen flex flex-col shadow-lg border-r border-gray-200 dark:border-gray-700 sticky top-0">
      <div className="lg:hidden absolute top-4 right-4 z-10">
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiX className="text-xl" />
        </button>
      </div>

      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
            <FiCheckSquare className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-gray-900 dark:text-white font-semibold text-lg">Team-Pulse</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">{currentRole} Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleItemClick(item)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left ${
                  currentPage === item.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <item.icon
                  className={`text-lg ${
                    currentPage === item.id ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
                  }`}
                />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
