import { Link } from 'react-router-dom'
import {
  Target,
  Calendar,
  Clock,
  TrendingUp,
  ChevronRight,
  BookOpen,
  PlusCircle,
  CheckCircle2,
  Circle,
} from 'lucide-react'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import TaskItem from '../components/TaskItem'
import { EmptyState } from '../components/EmptyState'
import { SkeletonDashboard } from '../components/SkeletonLoader'
import useStore from '../store/useStore'
import { formatDate, daysRemaining } from '../utils/helpers'

/**
 * Dashboard — Overview of the current study plan with progress and today's tasks
 */
export default function Dashboard() {
  const { plan, planId, isLoading, completedTasks, toggleTask, isTaskCompleted, getProgress } = useStore()

  // Loading state
  if (isLoading) {
    return (
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <SkeletonDashboard />
      </div>
    )
  }

  // No plan yet
  if (!plan) {
    return (
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <EmptyState
          icon={BookOpen}
          title="No Study Plan Yet"
          description="Create your first AI-powered study plan to get started on your learning journey."
          action={
            <Link to="/create-plan" className="btn-primary" style={{ marginTop: '0.5rem' }}>
              <PlusCircle size={18} />
              Create Your Plan
            </Link>
          }
        />
      </div>
    )
  }

  const progress = getProgress()
  const days = daysRemaining(plan.deadline)
  const totalTasks = plan.weeks?.reduce((acc, w) => acc + w.days.reduce((a, d) => a + d.tasks.length, 0), 0) || 0

  // Find today's tasks (or show first day's tasks as demo)
  let todayTasks = []
  let todayLabel = ''
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  plan.weeks?.forEach((week, wi) => {
    week.days.forEach((day, di) => {
      if (day.date === todayStr) {
        todayTasks = day.tasks.map((task, ti) => ({
          ...task,
          key: `week${wi}-day${di}-task${ti}`,
        }))
        todayLabel = `${day.day}, ${formatDate(day.date)}`
      }
    })
  })

  // Fallback to first day if no match for today
  if (todayTasks.length === 0 && plan.weeks?.length > 0) {
    const firstDay = plan.weeks[0].days[0]
    todayTasks = firstDay.tasks.map((task, ti) => ({
      ...task,
      key: `week0-day0-task${ti}`,
    }))
    todayLabel = `${firstDay.day}, ${formatDate(firstDay.date)}`
  }

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Track your progress and stay on top of your learning goals.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        className="animate-fade-in-up delay-100"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: 'rgba(99, 102, 241, 0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Target size={20} color="var(--color-primary-light)" />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Goal</p>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{plan.goal}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: 'rgba(14, 165, 233, 0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Calendar size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Deadline</p>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {days !== null ? `${days} days left` : 'Not set'}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CheckCircle2 size={20} color="var(--color-success)" />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Completed</p>
              <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {completedTasks.length} / {totalTasks} tasks
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress */}
      <Card className="animate-fade-in-up delay-200" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={18} color="var(--color-primary-light)" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 600 }}>Overall Progress</h2>
          </div>
          <Link
            to={`/plan/${planId || 'demo-plan-001'}`}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.25rem',
              color: 'var(--color-primary-light)', fontWeight: 500, fontSize: '0.85rem',
              textDecoration: 'none',
            }}
          >
            View Full Plan <ChevronRight size={16} />
          </Link>
        </div>
        <ProgressBar value={progress} label="Study Plan Completion" />
      </Card>

      {/* Today's Tasks */}
      <div className="animate-fade-in-up delay-300">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.15rem' }}>
              Today's Tasks
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{todayLabel}</p>
          </div>
          <span className="badge badge-primary">
            {todayTasks.filter(t => isTaskCompleted(t.key)).length}/{todayTasks.length} done
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {todayTasks.map((task) => (
            <TaskItem
              key={task.key}
              task={task}
              taskKey={task.key}
              isCompleted={isTaskCompleted(task.key)}
              onToggle={toggleTask}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
