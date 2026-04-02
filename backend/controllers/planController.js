const StudyPlan = require('../models/StudyPlan');
const AIService = require('../services/aiService');

/**
 * Generate a new study plan.
 * POST /api/generate-plan
 */
exports.generatePlan = async (req, res, next) => {
  const { goal, deadline, hoursPerDay, level, subjects, weakAreas } = req.body;

  // Basic validation
  if (!goal || !deadline || !hoursPerDay || !level || !subjects) {
    return res.status(400).json({ error: 'Please provide all required fields (goal, deadline, hoursPerDay, level, subjects).' });
  }

  try {
    const planData = await AIService.generateStudyPlan({ goal, deadline, hoursPerDay, level, subjects, weakAreas });

    const studyPlan = new StudyPlan({
      goal,
      deadline,
      hoursPerDay,
      level,
      subjects,
      weakAreas,
      plan: planData
    });

    await studyPlan.save();
    res.status(201).json(studyPlan);
  } catch (error) {
    console.error('Plan Generation Error:', error.message);
    res.status(500).json({ error: 'Failed to generate study plan. Please try again later.' });
  }
};

/**
 * Get a specific study plan.
 * GET /api/plan/:id
 */
exports.getPlan = async (req, res, next) => {
  try {
    const studyPlan = await StudyPlan.findById(req.params.id);
    if (!studyPlan) {
      return res.status(404).json({ error: 'Study plan not found.' });
    }
    res.status(200).json(studyPlan);
  } catch (error) {
    console.error('Fetch Plan Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch the study plan.' });
  }
};

/**
 * Update task progress for a plan.
 * PUT /api/progress/:id
 * Body: { "completedTasks": ["week0-day0-task0", ...] }
 */
exports.updateProgress = async (req, res, next) => {
  const { completedTasks } = req.body;

  if (!Array.isArray(completedTasks)) {
    return res.status(400).json({ error: 'completedTasks must be an array of task keys.' });
  }

  try {
    const studyPlan = await StudyPlan.findById(req.params.id);
    if (!studyPlan) {
      return res.status(404).json({ error: 'Study plan not found.' });
    }

    studyPlan.completedTasks = completedTasks;
    await studyPlan.save();

    res.status(200).json(studyPlan);
  } catch (error) {
    console.error('Update Progress Error:', error.message);
    res.status(500).json({ error: 'Failed to update study plan progress.' });
  }
};
