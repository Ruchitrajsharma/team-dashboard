import { useSelector, useDispatch } from "react-redux"
import { switchRole } from "../redux/slices/roleSlice"
import { toggleTheme } from "../redux/slices/themeSlice"
import { FiSearch, FiUser, FiMenu, FiMoon, FiSun } from "react-icons/fi"
import NotificationDropdown from "./NotificationDropdown"

const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch()
  const { currentRole, currentUser } = useSelector((state) => state.role)
  const { isDarkMode } = useSelector((state) => state.theme)

  const handleRoleToggle = () => {
    const newRole = currentRole === "member" ? "lead" : "member"
    dispatch(switchRole(newRole))
  }

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-red-700 h-16 sticky top-0 z-30">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-teal-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-teal-700 rounded-lg transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-lg">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search team members, tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-red-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>

          <NotificationDropdown />

          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Member</span>
            <button
              onClick={handleRoleToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                currentRole === "lead" ? "bg-cyan-600 dark:bg-cyan-500" : "bg-gray-200 dark:bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  currentRole === "lead" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">Lead</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{currentUser}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{currentRole} Profile</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header