import axios from "axios";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  salary?: string;
  requirements?: string[];
  postedDate: string;
}

// Mock API URL (you can replace with real API)
const API_BASE_URL = "https://6857e2b721f5d3463e5676b9.mockapi.io/api/v1";

// Fallback mock data if API fails
const fallbackJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "We are looking for a skilled Frontend Developer to join our team and help build amazing user experiences.",
    salary: "$80,000 - $120,000",
    requirements: ["React", "TypeScript", "CSS"],
    postedDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataFlow Inc",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Join our backend team to build scalable APIs and microservices using modern technologies.",
    salary: "$90,000 - $130,000",
    requirements: ["Node.js", "Python", "PostgreSQL"],
    postedDate: "2024-01-14",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Remote",
    type: "Contract",
    description:
      "Help us create beautiful and intuitive user interfaces for our products.",
    salary: "$70,000 - $100,000",
    requirements: ["Figma", "Adobe Creative Suite", "User Research"],
    postedDate: "2024-01-13",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Austin, TX",
    type: "Full-time",
    description:
      "Manage our cloud infrastructure and deployment pipelines to ensure smooth operations.",
    salary: "$85,000 - $125,000",
    requirements: ["AWS", "Docker", "Kubernetes"],
    postedDate: "2024-01-12",
  },
  {
    id: "5",
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Seattle, WA",
    type: "Part-time",
    description:
      "Develop native mobile applications for iOS and Android platforms.",
    salary: "$60,000 - $90,000",
    requirements: ["React Native", "Swift", "Kotlin"],
    postedDate: "2024-01-11",
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Boston, MA",
    type: "Full-time",
    description:
      "Apply machine learning and statistical analysis to solve complex business problems.",
    salary: "$95,000 - $140,000",
    requirements: ["Python", "R", "TensorFlow"],
    postedDate: "2024-01-10",
  },
  {
    id: "7",
    title: "Product Manager",
    company: "Innovate Labs",
    location: "Remote",
    type: "Full-time",
    description:
      "Lead product strategy and development for our innovative software solutions.",
    salary: "$100,000 - $150,000",
    requirements: ["Product Strategy", "Agile", "User Research"],
    postedDate: "2024-01-09",
  },
  {
    id: "8",
    title: "QA Engineer",
    company: "Quality First",
    location: "Chicago, IL",
    type: "Part-time",
    description:
      "Ensure software quality through comprehensive testing and automation.",
    salary: "$65,000 - $95,000",
    requirements: ["Selenium", "Jest", "Manual Testing"],
    postedDate: "2024-01-08",
  },
];

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// API service functions
export const jobApi = {
  // Fetch all jobs
  getJobs: async (): Promise<Job[]> => {
    try {
      const response = await api.get("/jobs");
      return response.data;
    } catch (error) {
      console.warn("API call failed, using fallback data:", error);
      // Return fallback data if API fails
      return fallbackJobs;
    }
  },

  // Fetch job by ID
  getJobById: async (id: string): Promise<Job | null> => {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.warn("API call failed, using fallback data:", error);
      // Find job in fallback data
      return fallbackJobs.find((job) => job.id === id) || null;
    }
  },

  // Search jobs (if API supports it)
  searchJobs: async (query: string): Promise<Job[]> => {
    try {
      const response = await api.get(
        `/jobs?search=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.warn("Search API call failed, filtering locally:", error);
      // Filter fallback data locally
      return fallbackJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  // Filter jobs by type
  filterJobsByType: async (type: string): Promise<Job[]> => {
    try {
      const response = await api.get(`/jobs?type=${encodeURIComponent(type)}`);
      return response.data;
    } catch (error) {
      console.warn("Filter API call failed, filtering locally:", error);
      // Filter fallback data locally
      return fallbackJobs.filter(
        (job) => job.type.toLowerCase() === type.toLowerCase()
      );
    }
  },
};

export default api;
