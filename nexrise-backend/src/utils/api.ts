// src/utils/api.ts

// -------- Types that match BACKEND response --------

export interface FormData {
  interests: string;
  skills: string;
  branch: string;
  year: string;
  goal: string;
  experience: string;
}

// Backend shape
export interface CareerPath {
  name: string;
  reason: string;
}

export interface RecommendationResponse {
  career_paths: CareerPath[];
  skills_to_learn: string[];
  roadmap: string[];       // backend gives array of strings
  projects: string[];
  courses: string[];
  internships: string[];
}

// -------- API base URL (from Vite env) --------

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:5000";

// -------- Real API call to NexRise backend --------

export const getRecommendations = async (
  formData: FormData
): Promise<RecommendationResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Backend error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as Partial<RecommendationResponse>;

  // Normalize to avoid undefined
  return {
    career_paths: data.career_paths ?? [],
    skills_to_learn: data.skills_to_learn ?? [],
    roadmap: data.roadmap ?? [],
    projects: data.projects ?? [],
    courses: data.courses ?? [],
    internships: data.internships ?? [],
  };
};
