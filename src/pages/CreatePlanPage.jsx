import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Target,
  Calendar,
  Clock,
  GraduationCap,
  BookOpen,
  AlertCircle,
  Sparkles,
  Loader2,
} from 'lucide-react'
import Card from '../components/Card'
import ErrorMessage from '../components/ErrorMessage'
import useStore from '../store/useStore'
import { generatePlan } from '../services/api'

/**
 * CreatePlanPage — Form to collect user study preferences and generate a plan
 */
export default function CreatePlanPage() {
  const navigate = useNavigate()
  const { userInput, setUserInput, setPlan, setLoading, isLoading, error, setError, clearError } = useStore()

  const [formData, setFormData] = useState({
    goal: userInput.goal || '',
    deadline: userInput.deadline || '',
    hoursPerDay: userInput.hoursPerDay || 2,
    level: userInput.level || 'beginner',
    subjects: userInput.subjects || '',
    weakAreas: userInput.weakAreas || '',
  })

  const levels = [
    { value: 'beginner', label: 'Beginner', icon: '🌱' },
    { value: 'intermediate', label: 'Intermediate', icon: '🌿' },
    { value: 'advanced', label: 'Advanced', icon: '🌳' },
  ]

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()

    // Basic validation
    if (!formData.goal.trim()) {
      setError('Please enter your learning goal.')
      return
    }
    if (!formData.deadline) {
      setError('Please set a deadline.')
      return
    }
    if (!formData.subjects.trim()) {
      setError('Please enter at least one subject.')
      return
    }

    setLoading(true)
    setUserInput(formData)

    try {
      const plan = await generatePlan(formData)
      setPlan(plan, plan.id || 'demo-plan-001')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to generate plan. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem', maxWidth: '720px' }}>
      {/* Header */}
      <div className="animate-fade-in-up" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Create Your <span className="gradient-text">Study Plan</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Fill in your details and let AI design the perfect learning schedule for you.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="animate-fade-in" style={{
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: 'var(--color-danger)',
          fontSize: '0.875rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem',
        }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Goal */}
          <Card className="animate-fade-in-up delay-100">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Target size={15} color="var(--color-primary-light)" />
              Learning Goal
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., Master React and build production apps"
              value={formData.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
            />
          </Card>

          {/* Deadline + Hours per day */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <Card className="animate-fade-in-up delay-200">
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} color="var(--color-primary-light)" />
                Deadline
              </label>
              <input
                type="date"
                className="input-field"
                value={formData.deadline}
                onChange={(e) => handleChange('deadline', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={{ colorScheme: 'dark' }}
              />
            </Card>

            <Card className="animate-fade-in-up delay-200">
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={15} color="var(--color-primary-light)" />
                Hours / Day
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={formData.hoursPerDay}
                  onChange={(e) => handleChange('hoursPerDay', parseInt(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--color-primary)' }}
                />
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--color-primary-light)',
                  minWidth: '40px',
                  textAlign: 'center',
                }}>
                  {formData.hoursPerDay}h
                </span>
              </div>
            </Card>
          </div>

          {/* Level */}
          <Card className="animate-fade-in-up delay-300">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <GraduationCap size={15} color="var(--color-primary-light)" />
              Your Level
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {levels.map((lvl) => (
                <button
                  key={lvl.value}
                  type="button"
                  onClick={() => handleChange('level', lvl.value)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: `1.5px solid ${formData.level === lvl.value ? 'var(--color-primary)' : 'var(--border-color)'}`,
                    background: formData.level === lvl.value ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                    color: formData.level === lvl.value ? 'var(--color-primary-light)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <span style={{ fontSize: '1.2rem', display: 'block', marginBottom: '0.25rem' }}>{lvl.icon}</span>
                  {lvl.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Subjects */}
          <Card className="animate-fade-in-up delay-300">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <BookOpen size={15} color="var(--color-primary-light)" />
              Subjects
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g., React, JavaScript, CSS, Node.js"
              value={formData.subjects}
              onChange={(e) => handleChange('subjects', e.target.value)}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              Separate multiple subjects with commas
            </p>
          </Card>

          {/* Weak Areas */}
          <Card className="animate-fade-in-up delay-400">
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={15} color="var(--color-accent)" />
              Weak Areas (Optional)
            </label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="e.g., Async/Await, Hooks, State management..."
              value={formData.weakAreas}
              onChange={(e) => handleChange('weakAreas', e.target.value)}
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
          </Card>

          {/* Submit */}
          <div className="animate-fade-in-up delay-500" style={{ paddingTop: '0.5rem' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
              style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  Generating Your Plan...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Study Plan
                </>
              )}
            </button>
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </form>
    </div>
  )
}
