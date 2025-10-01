import { createSlice } from "@reduxjs/toolkit"

// Sample team members data
const initialMembers = [
  {
    id: 1,
    name: "Ruchit",
    email: "ruchit@company.com",
    status: "Working",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    tasks: [],
    lastActivity: Date.now(), // Added lastActivity for auto-reset feature
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@company.com",
    status: "Meeting",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    tasks: [
      {
        id: 1,
        title: "Review project proposal",
        dueDate: "2024-01-15",
        progress: 60,
        completed: false,
      },
    ],
    lastActivity: Date.now(),
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@company.com",
    status: "Break",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    tasks: [],
    lastActivity: Date.now(),
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@company.com",
    status: "Offline",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    tasks: [
      {
        id: 2,
        title: "Update documentation",
        dueDate: "2024-01-20",
        progress: 30,
        completed: false,
      },
    ],
    lastActivity: Date.now(),
  },
]

const loadStateFromStorage = () => {
  try {
    const savedState = localStorage.getItem("teamPulseState")
    if (savedState) {
      return JSON.parse(savedState)
    }
  } catch (error) {
    console.error("Error loading state from localStorage:", error)
  }
  return {
    members: initialMembers,
    statusFilter: "All",
  }
}

const membersSlice = createSlice({
  name: "members",
  initialState: loadStateFromStorage(),
  reducers: {
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload
      const member = state.members.find((m) => m.id === memberId)
      if (member) {
        member.status = status
        member.lastActivity = Date.now() // Update last activity timestamp
      }
    },
    assignTask: (state, action) => {
      const { memberId, task } = action.payload
      const member = state.members.find((m) => m.id === memberId)
      if (member) {
        const newTask = {
          id: Date.now(),
          title: task.title,
          dueDate: task.dueDate,
          progress: 0,
          completed: false,
        }
        member.tasks.push(newTask)
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, progress } = action.payload
      const member = state.members.find((m) => m.id === memberId)
      if (member) {
        const task = member.tasks.find((t) => t.id === taskId)
        if (task) {
          task.progress = progress
          task.completed = progress >= 100
        }
        member.lastActivity = Date.now() // Update last activity when updating tasks
      }
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload
    },
    resetInactiveUsers: (state) => {
      const tenMinutesAgo = Date.now() - 10 * 60 * 1000
      state.members.forEach((member) => {
        if (member.lastActivity < tenMinutesAgo && member.status !== "Offline") {
          member.status = "Offline"
        }
      })
    },
  },
})

export const { updateMemberStatus, assignTask, updateTaskProgress, setStatusFilter, resetInactiveUsers } =
  membersSlice.actions
export default membersSlice.reducer
