export function buildCareerPrompt({ interests, skills, branch, year, goal, experience }) {
  const interestsText = Array.isArray(interests) ? interests.join(", ") : interests;
  const skillsText = Array.isArray(skills) ? skills.join(", ") : skills;

  return `

You are an expert career mentor for engineering students in India.

User profile:

- Branch: ${branch}

- Year: ${year}

- Interests: ${interestsText}

- Skills: ${skillsText}

- Goal: ${goal}

- Experience: ${experience || "Not specified"}

Your task is to generate a JSON response that strictly follows this schema:

{

  "career_paths": [

    { "name": "string", "reason": "string" }

  ],

  "skills_to_learn": ["string"],

  "roadmap": ["string"],

  "projects": ["string"],

  "courses": ["string"],

  "internships": ["string"]

}

Rules:

- Return ONLY valid JSON.

- Do NOT include any Markdown, backticks, comments, or explanations.

- Ensure "career_paths" has 3–5 options.

- Each array ("skills_to_learn", "roadmap", "projects", "courses", "internships") must have at least 3 meaningful, specific items.

`;
}

