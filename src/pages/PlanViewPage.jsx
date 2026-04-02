import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Sparkles,
  BookOpen,
  PlusCircle,
} from 'lucide-react'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import TaskItem from '../components/TaskItem'
import ErrorMessage from '../components/ErrorMessage'
import { EmptyState, LoadingSpinner } from '../components/EmptyState'
import { SkeletonPlanView } from '../components/SkeletonLoader'
import useStore from '../store/useStore'
import { getPlan } from '../services/api'
import { formatDate, isToday } from '../utils/helpers'

/**
 * PlanViewPage — Full weekly + daily schedule with task completion
 */
export default function PlanViewPage() {
  const { id } = useParams()
  const {
    plan, planId, setPlan,
    isLoading, setLoading,
    error, setError, clearError,
    toggleTask, isTaskCompleted, getProgress, completedTasks,
  } = useStore()

  const [expandedWeeks, setExpandedWeeks] = useState({})

  // Fetch plan if not already loaded or different ID
  useEffect(() => {
    const fetchPlan = async () => {
      if (plan && planId === id) return // Already loaded
      setLoading(true)
      clearError()
      try {
        const data = await getPlan(id)
        setPlan(data, data.id || id)
      } catch (err) {
        setError(err.message || 'Failed to load plan.')
      } finally {
        setLoading(false)
      }
    }
    fetchPlan()
  }, [id])

  // Auto-expand week containing today (or first week)
  useEffect(() => {
    if (plan?.weeks) {
      const initial = {}
      let foundToday = false
      plan.weeks.forEach((week, wi) => {
        week.days.forEach((day) => {
          if (isToday(day.date)) {
            initial[wi] = true
            foundToday = true
          }
        })
      })
      if (!foundToday && plan.weeks.length > 0) {
        initial[0] = true
      }
      setExpandedWeeks(initial)
    }
  }, [plan])

  const toggleWeek = (weekIndex) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekIndex]: !prev[weekIndex],
    }))
  }

  // Calculate week progress
  const getWeekProgress = (week, weekIndex) => {
    let total = 0
    let completed = 0
    week.days.forEach((day, di) => {
      day.tasks.forEach((_, ti) => {
        total++
        if (isTaskCompleted(`week${weekIndex}-day${di}-task${ti}`)) {
          completed++
        }
      })
    })
    return total === 0 ? 0 : Math.round((completed / total) * 100)
  }

  // Loading
  if (isLoading) {
    return (
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <SkeletonPlanView />
      </div>
    )
  }

  // Error
  if (error) {
    return (
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  // No plan
  if (!plan) {
    return (
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        <EmptyState
          icon={BookOpen}
          title="Plan Not Found"
          description="This plan doesn't exist or hasn't been created yet."
          action={
            <Link to="/create-plan" className="btn-primary" style={{ marginTop: '0.5rem' }}>
              <PlusCircle size={18} />
              Create a New Plan
            </Link>
          }
        />
      </div>
    )
  }

  const progress = getProgress()

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ marginBottom: '2rem' }}>
        <Link
          to="/dashboard"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
            color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none',
            marginBottom: '1rem', fontWeight: 500,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary-light)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={24} color="var(--color-primary-light)" />
              {plan.goal}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {plan.weeks?.length} weeks · {plan.hoursPerDay}h/day · {plan.level}
            </p>
          </div>
          <div style={{ minWidth: '200px' }}>
            <ProgressBar value={progress} label="Overall" />
          </div>
        </div>
      </div>

      {/* Weeks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {plan.weeks?.map((week, wi) => {
          const isExpanded = expandedWeeks[wi]
          const weekProgress = getWeekProgress(week, wi)

          return (
            <div key={wi} className={`animate-fade-in-up delay-${Math.min((wi + 1) * 100, 500)}`}>
              {/* Week Header (collapsible) */}
              <Card
                style={{
                  cursor: 'pointer',
                  padding: '1.25rem 1.5rem',
                  borderBottom: isExpanded ? 'none' : undefined,
                  borderBottomLeftRadius: isExpanded ? 0 : undefined,
                  borderBottomRightRadius: isExpanded ? 0 : undefined,
                }}
                onClick={() => toggleWeek(wi)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.85rem', fontWeight: 700, color: 'white',
                    }}>
                      W{week.weekNumber}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>
                        Week {week.weekNumber}: {week.title}
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {week.days.length} days · {weekProgress}% complete
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '100px', display: 'none' }}>
                      <ProgressBar value={weekProgress} showPercentage={false} />
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={20} color="var(--text-muted)" />
                    ) : (
                      <ChevronDown size={20} color="var(--text-muted)" />
                    )}
                  </div>
                </div>
              </Card>

              {/* Week Content (expanded) */}
              {isExpanded && (
                <div
                  style={{
                    background: 'rgba(30, 41, 59, 0.4)',
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    borderTop: 'none',
                    borderBottomLeftRadius: 'var(--border-radius)',
                    borderBottomRightRadius: 'var(--border-radius)',
                    padding: '1rem 1.25rem',
                    animation: 'fadeIn 0.3s ease-out',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {week.days.map((day, di) => {
                      const dayIsToday = isToday(day.date)
                      const dayCompletedCount = day.tasks.filter((_, ti) =>
                        isTaskCompleted(`week${wi}-day${di}-task${ti}`)
                      ).length

                      return (
                        <div key={di}>
                          {/* Day Header */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem',
                            paddingBottom: '0.5rem',
                            borderBottom: '1px solid var(--border-color)',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <CalendarDays size={16} color={dayIsToday ? 'var(--color-primary-light)' : 'var(--text-muted)'} />
                              <span style={{
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: dayIsToday ? 'var(--color-primary-light)' : 'var(--text-primary)',
                              }}>
                                {day.day}
                              </span>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                {formatDate(day.date)}
                              </span>
                              {dayIsToday && (
                                <span className="badge badge-primary" style={{ fontSize: '0.6rem', padding: '0.1rem 0.5rem' }}>
                                  TODAY
                                </span>
                              )}
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                              {dayCompletedCount}/{day.tasks.length}
                            </span>
                          </div>

                          {/* Day Tasks */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {day.tasks.map((task, ti) => {
                              const taskKey = `week${wi}-day${di}-task${ti}`
                              return (
                                <TaskItem
                                  key={taskKey}
                                  task={task}
                                  taskKey={taskKey}
                                  isCompleted={isTaskCompleted(taskKey)}
                                  onToggle={toggleTask}
                                />
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
