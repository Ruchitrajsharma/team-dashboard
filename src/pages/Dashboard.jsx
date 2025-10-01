import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { resetInactiveUsers } from "../redux/slices/membersSlice"
import { initializeTheme } from "../redux/slices/themeSlice"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import TeamLeadView from "../components/TeamLeadView"
import TeamMemberView from "../components/TeamMemberView"
import SettingsPage from "./SettingsPage"
import TeamMembersPage from "./TeamMembersPage"
import TasksPage from "./TasksPage"
import ProjectsPage from "./ProjectsPage"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { currentRole } = useSelector((state) => state.role)
  const { currentPage } = useSelector((state) => state.navigation)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    dispatch(initializeTheme())

    const autoResetInterval = setInterval(() => {
      dispatch(resetInactiveUsers())
    }, 60000)

    return () => clearInterval(autoResetInterval)
  }, [dispatch])

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return currentRole === "lead" ? <TeamLeadView /> : <TeamMemberView />
      case "settings":
        return <SettingsPage />
      case "team":
        return <TeamMembersPage />
      case "tasks":
        return <TasksPage />
      case "projects":
        return <ProjectsPage />
      default:
        return currentRole === "lead" ? <TeamLeadView /> : <TeamMemberView />
    }
  }

  return (
     <div className="min-h-screen bg-sky-100 dark:bg-sky-400 flex

">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out lg:h-screen`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-gray-900 text-white lg:h-screen
">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
