import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CreatePlanPage from './pages/CreatePlanPage'
import PlanViewPage from './pages/PlanViewPage'

/**
 * App — Root component with route definitions
 */
function App() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-plan" element={<CreatePlanPage />} />
          <Route path="/plan/:id" element={<PlanViewPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
