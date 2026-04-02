const mongoose = require('mongoose');

/**
 * StudyPlan Model
 * Stores the study plan details, the generated structure, and user inputs.
 */
const StudyPlanSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: [true, 'Learning goal is required.'],
    trim: true,
  },
  deadline: {
    type: String,
    required: [true, 'Deadline is required.'],
  },
  hoursPerDay: {
    type: Number,
    required: [true, 'Study hours per day is required.'],
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  subjects: {
    type: [String],
    default: [],
  },
  weakAreas: {
    type: [String],
    default: [],
  },
  plan: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, 'Plan data is required.'],
  },
  completedTasks: {
    type: [String], // Array of task keys: ["week0-day0-task0", ...]
    default: [],
  },
  // Progress percentage (0-100)
  progress: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Update progress percentage before saving
StudyPlanSchema.pre('save', function(next) {
  if (this.plan && this.plan.weeks) {
    let totalTasks = 0;
    this.plan.weeks.forEach(week => {
      week.days.forEach(day => {
        totalTasks += day.tasks.length;
      });
    });

    if (totalTasks > 0) {
      this.progress = Math.round((this.completedTasks.length / totalTasks) * 100);
    }
  }
  next();
});

module.exports = mongoose.model('StudyPlan', StudyPlanSchema);
