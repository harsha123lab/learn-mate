const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock_key',
});

/**
 * AI Service for LearnMate Study Planner.
 * Generates personalized study plans based on user input.
 */
class AIService {
  static async generateStudyPlan(userInput) {
    const { goal, deadline, hoursPerDay, level, subjects, weakAreas } = userInput;

    const systemPrompt = `
      You are a senior education consultant and AI study planner. Your goal is to generate a highly detailed, 
      personalized study plan for a student based on their learning goals.
      
      Requirements:
      - Strictly output JSON in the specified format. 
      - The plan should be realistic and broken down into weekly milestones and daily tasks.
      - Tasks should include: title, duration, type (study, practice, project, quiz, review), and a short description.
      - Each task should have a clear learning objective.
      - The plan should account for the provided deadline and hours per day available.
      - Adjust complexity based on the student's level (beginner, intermediate, advanced).
      - Address the mentioned weak areas with specific practice sessions.

      Output JSON Format:
      {
        "weeks": [
          {
            "weekNumber": 1,
            "title": "Week 1 Title",
            "days": [
              {
                "day": "Monday",
                "date": "YYYY-MM-DD",
                "tasks": [
                  { "title": "Task 1", "duration": "1.5h", "type": "study", "description": "..." },
                  ...
                ]
              },
              ...
            ]
          },
          ...
        ]
      }
    `;

    const userPrompt = `
      Student Goal: ${goal}
      Target Deadline: ${deadline}
      Hours per Day: ${hoursPerDay}
      Current Level: ${level}
      Subjects: ${subjects.join(', ')}
      Weak Areas: ${weakAreas.join(', ')}
    `;

    // Check if we have a valid API key
    if (!process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY === 'YOUR_OPENAI_API_KEY') {
      console.warn('Using MOCK_GENERATOR: OpenAI API Key not provided.');
      return this.MOCK_GENERATOR(userInput);
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error('AI Strategy Failure:', error.message);
      // Fallback to mock data if AI call fails
      return this.MOCK_GENERATOR(userInput);
    }
  }

  /**
   * MOCK_GENERATOR: Generates a sample plan for demonstration.
   */
  static MOCK_GENERATOR(userInput) {
    const { goal, deadline, hoursPerDay, level } = userInput;
    // Generate a simple 2-week plan for demonstration
    const weeks = [];
    for (let w = 1; w <= 3; w++) {
      const days = [];
      const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      
      dayNames.forEach((dayName, d) => {
        const date = new Date(Date.now() + (w * 7 + d) * 24 * 60 * 60 * 1000);
        days.push({
          day: dayName,
          date: date.toISOString().split('T')[0],
          tasks: [
            { 
              title: `Introduction to ${goal} - Part ${w}.${d+1}`,
              duration: `${hoursPerDay / 2}h`,
              type: 'study',
              description: `Focusing on core principles and fundamentals for ${level} level.`
            },
            {
              title: `Hands-on Practice: ${goal} Exercise`,
              duration: `${hoursPerDay / 2}h`,
              type: 'practice',
              description: 'Applying what you learned with real-world scenarios.'
            }
          ]
        });
      });

      weeks.push({
        weekNumber: w,
        title: `Foundations of ${goal} - Week ${w}`,
        days
      });
    }

    return { weeks };
  }
}

module.exports = AIService;
