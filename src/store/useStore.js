import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Zustand Store — Central state management with localStorage persistence
 * 
 * Stores:
 * - userInput: form data from the Create Plan page
 * - plan: the AI-generated study plan
 * - progress: task completion tracking
 */
const useStore = create(
  persist(
    (set, get) => ({
      // ─── User Input State ───
      userInput: {
        goal: '',
        deadline: '',
        hoursPerDay: 2,
        level: 'beginner',
        subjects: '',
        weakAreas: '',
      },
      setUserInput: (input) =>
        set({ userInput: { ...get().userInput, ...input } }),
      resetUserInput: () =>
        set({
          userInput: {
            goal: '',
            deadline: '',
            hoursPerDay: 2,
            level: 'beginner',
            subjects: '',
            weakAreas: '',
          },
        }),

      // ─── Plan State ───
      plan: null,
      planId: null,
      setPlan: (plan, id) => set({ plan, planId: id }),
      clearPlan: () => set({ plan: null, planId: null }),

      // ─── Progress State ───
      // completedTasks is a Set stored as array: ['week1-day1-task0', ...]
      completedTasks: [],
      toggleTask: (taskKey) => {
        const current = get().completedTasks
        const updated = current.includes(taskKey)
          ? current.filter((k) => k !== taskKey)
          : [...current, taskKey]
        set({ completedTasks: updated })
      },
      isTaskCompleted: (taskKey) => {
        return get().completedTasks.includes(taskKey)
      },
      getProgress: () => {
        const { plan, completedTasks } = get()
        if (!plan || !plan.weeks) return 0
        let total = 0
        plan.weeks.forEach((week) => {
          week.days.forEach((day) => {
            total += day.tasks.length
          })
        })
        if (total === 0) return 0
        return Math.round((completedTasks.length / total) * 100)
      },
      resetProgress: () => set({ completedTasks: [] }),

      // ─── Loading & Error ───
      isLoading: false,
      error: null,
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'learnmate-storage',
      // Only persist these fields to localStorage
      partialize: (state) => ({
        userInput: state.userInput,
        plan: state.plan,
        planId: state.planId,
        completedTasks: state.completedTasks,
      }),
    }
  )
)

export default useStore
