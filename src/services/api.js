import axios from 'axios'

/**
 * API Service — Axios instance and endpoint wrappers
 * Base URL: http://localhost:5000/api
 * 
 * If the backend is not running, the mock fallback
 * in each function will return sample data so the
 * frontend remains fully runnable standalone.
 */
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Mock Data for standalone demo ───
const MOCK_PLAN = {
  id: 'demo-plan-001',
  goal: 'Master React & JavaScript',
  deadline: '2026-06-01',
  hoursPerDay: 3,
  level: 'intermediate',
  subjects: ['React', 'JavaScript', 'CSS'],
  weakAreas: ['Hooks', 'Async/Await'],
  createdAt: new Date().toISOString(),
  weeks: [
    {
      weekNumber: 1,
      title: 'Foundation & Core Concepts',
      days: [
        {
          day: 'Monday',
          date: '2026-04-06',
          tasks: [
            { title: 'Review JavaScript ES6+ Features', duration: '1.5h', type: 'study', description: 'Arrow functions, destructuring, spread operator, template literals' },
            { title: 'Practice Array Methods', duration: '1h', type: 'practice', description: 'map, filter, reduce, forEach with exercises' },
            { title: 'Quiz: ES6 Fundamentals', duration: '30min', type: 'quiz', description: 'Self-assessment on modern JS syntax' },
          ],
        },
        {
          day: 'Tuesday',
          date: '2026-04-07',
          tasks: [
            { title: 'Async JavaScript Deep Dive', duration: '1.5h', type: 'study', description: 'Promises, async/await, error handling patterns' },
            { title: 'Build a Fetch Wrapper', duration: '1h', type: 'project', description: 'Create a reusable API client with error handling' },
            { title: 'Review & Notes', duration: '30min', type: 'review', description: 'Summarize key takeaways from today\'s lessons' },
          ],
        },
        {
          day: 'Wednesday',
          date: '2026-04-08',
          tasks: [
            { title: 'React Fundamentals', duration: '1.5h', type: 'study', description: 'JSX, Components, Props, and State basics' },
            { title: 'Build a Counter App', duration: '1h', type: 'project', description: 'Practice useState and event handling' },
            { title: 'Read React Docs: Thinking in React', duration: '30min', type: 'study', description: 'Official guide on component-driven design' },
          ],
        },
        {
          day: 'Thursday',
          date: '2026-04-09',
          tasks: [
            { title: 'React Hooks: useState & useEffect', duration: '1.5h', type: 'study', description: 'Lifecycle, side effects, dependency arrays' },
            { title: 'Build a Weather Widget', duration: '1h', type: 'project', description: 'Fetch data from an API using useEffect' },
            { title: 'Debugging Practice', duration: '30min', type: 'practice', description: 'Use React DevTools to inspect component state' },
          ],
        },
        {
          day: 'Friday',
          date: '2026-04-10',
          tasks: [
            { title: 'Custom Hooks', duration: '1h', type: 'study', description: 'Creating reusable logic with custom hooks' },
            { title: 'Build useLocalStorage Hook', duration: '1h', type: 'project', description: 'Implement a hook that persists state to localStorage' },
            { title: 'Weekly Review & Quiz', duration: '1h', type: 'quiz', description: 'Comprehensive review of Week 1 topics' },
          ],
        },
      ],
    },
    {
      weekNumber: 2,
      title: 'Advanced Patterns & State Management',
      days: [
        {
          day: 'Monday',
          date: '2026-04-13',
          tasks: [
            { title: 'Context API & useContext', duration: '1.5h', type: 'study', description: 'Global state without prop drilling' },
            { title: 'Build a Theme Switcher', duration: '1h', type: 'project', description: 'Dark/light mode with Context API' },
            { title: 'Review Props vs Context', duration: '30min', type: 'review', description: 'When to use which approach' },
          ],
        },
        {
          day: 'Tuesday',
          date: '2026-04-14',
          tasks: [
            { title: 'React Router Fundamentals', duration: '1.5h', type: 'study', description: 'Routes, navigation, params, nested routes' },
            { title: 'Build a Multi-Page App', duration: '1h', type: 'project', description: 'Implement routing in a portfolio site' },
            { title: 'Route Guards & Protected Routes', duration: '30min', type: 'study', description: 'Authentication-based navigation' },
          ],
        },
        {
          day: 'Wednesday',
          date: '2026-04-15',
          tasks: [
            { title: 'CSS-in-JS & Tailwind CSS', duration: '1.5h', type: 'study', description: 'Modern styling approaches in React' },
            { title: 'Restyle a Component Library', duration: '1h', type: 'project', description: 'Build Card, Button, and Input with Tailwind' },
            { title: 'Responsive Design Patterns', duration: '30min', type: 'practice', description: 'Mobile-first design with utility classes' },
          ],
        },
        {
          day: 'Thursday',
          date: '2026-04-16',
          tasks: [
            { title: 'useReducer & Complex State', duration: '1.5h', type: 'study', description: 'State machines and reducer patterns' },
            { title: 'Build a Todo App with useReducer', duration: '1h', type: 'project', description: 'CRUD operations with reducer-based state' },
            { title: 'Compare useState vs useReducer', duration: '30min', type: 'review', description: 'Trade-offs and best practices' },
          ],
        },
        {
          day: 'Friday',
          date: '2026-04-17',
          tasks: [
            { title: 'Performance Optimization', duration: '1h', type: 'study', description: 'React.memo, useMemo, useCallback' },
            { title: 'Optimize a Slow Component', duration: '1h', type: 'practice', description: 'Profile and fix unnecessary re-renders' },
            { title: 'Week 2 Project & Review', duration: '1h', type: 'quiz', description: 'Build a mini dashboard using all Week 2 concepts' },
          ],
        },
      ],
    },
    {
      weekNumber: 3,
      title: 'Real-World Projects & Deployment',
      days: [
        {
          day: 'Monday',
          date: '2026-04-20',
          tasks: [
            { title: 'API Integration Patterns', duration: '1.5h', type: 'study', description: 'REST APIs, loading/error states, data fetching' },
            { title: 'Build a GitHub Profile Viewer', duration: '1h', type: 'project', description: 'Fetch and display user data from GitHub API' },
            { title: 'Error Boundaries', duration: '30min', type: 'study', description: 'Graceful error handling in React' },
          ],
        },
        {
          day: 'Tuesday',
          date: '2026-04-21',
          tasks: [
            { title: 'Testing React Components', duration: '1.5h', type: 'study', description: 'Jest, React Testing Library basics' },
            { title: 'Write Tests for Components', duration: '1h', type: 'practice', description: 'Unit tests for Button, Card, and Form components' },
            { title: 'Snapshot Testing', duration: '30min', type: 'study', description: 'When and how to use snapshot tests' },
          ],
        },
        {
          day: 'Wednesday',
          date: '2026-04-22',
          tasks: [
            { title: 'Full-Stack Integration', duration: '2h', type: 'project', description: 'Connect React frontend to a Node.js backend' },
            { title: 'Deploy to Vercel/Netlify', duration: '1h', type: 'project', description: 'CI/CD, environment variables, production build' },
          ],
        },
        {
          day: 'Thursday',
          date: '2026-04-23',
          tasks: [
            { title: 'Portfolio Project: Start', duration: '2h', type: 'project', description: 'Begin building a capstone project showcasing all skills' },
            { title: 'Code Review Best Practices', duration: '1h', type: 'study', description: 'Clean code, naming conventions, project structure' },
          ],
        },
        {
          day: 'Friday',
          date: '2026-04-24',
          tasks: [
            { title: 'Portfolio Project: Complete', duration: '2h', type: 'project', description: 'Finish, polish, and deploy capstone project' },
            { title: 'Final Assessment & Retrospective', duration: '1h', type: 'quiz', description: 'Comprehensive review and next steps planning' },
          ],
        },
      ],
    },
  ],
}

/**
 * POST /generate-plan — Submit user input to generate a study plan
 * Falls back to mock data if backend is unavailable
 */
export const generatePlan = async (formData) => {
  try {
    const response = await api.post('/generate-plan', formData)
    return response.data
  } catch (error) {
    console.warn('Backend unavailable, using mock plan data:', error.message)
    // Return mock data so the app is fully functional standalone
    return {
      ...MOCK_PLAN,
      goal: formData.goal || MOCK_PLAN.goal,
      deadline: formData.deadline || MOCK_PLAN.deadline,
      hoursPerDay: formData.hoursPerDay || MOCK_PLAN.hoursPerDay,
      level: formData.level || MOCK_PLAN.level,
    }
  }
}

/**
 * GET /plan/:id — Fetch a specific plan
 */
export const getPlan = async (id) => {
  try {
    const response = await api.get(`/plan/${id}`)
    return response.data
  } catch (error) {
    console.warn('Backend unavailable, using mock plan data:', error.message)
    return MOCK_PLAN
  }
}

/**
 * PUT /progress/:id — Update progress for a plan
 */
export const updateProgress = async (id, progressData) => {
  try {
    const response = await api.put(`/progress/${id}`, progressData)
    return response.data
  } catch (error) {
    console.warn('Backend unavailable, progress saved locally:', error.message)
    return { success: true, local: true }
  }
}

export default api
