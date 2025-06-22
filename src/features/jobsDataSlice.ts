import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { jobApi, Job } from "@/services/api";

export type JobDto = Job;

export interface JobFilters {
  search: string;
  location: string;
  type: string;
  company: string;
}

interface JobsDataState {
  jobs: Job[];
  appliedJobs: string[]; // Array of job IDs that user has applied to
  filters: JobFilters;
  loading: boolean;
  error: string | null;
}

// Load applied jobs from localStorage on initialization
const loadAppliedJobsFromStorage = (): string[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("appliedJobs");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading applied jobs from localStorage:", error);
      return [];
    }
  }
  return [];
};

const initialState: JobsDataState = {
  jobs: [],
  appliedJobs: loadAppliedJobsFromStorage(),
  filters: {
    search: "",
    location: "",
    type: "",
    company: "",
  },
  loading: false,
  error: null,
};

// Async thunk for fetching jobs
export const fetchJobs = createAsyncThunk(
  "jobsData/fetchJobs",
  async (_, { rejectWithValue }) => {
    try {
      const jobs = await jobApi.getJobs();
      return jobs;
    } catch (error) {
      return rejectWithValue("Failed to fetch jobs");
    }
  }
);

// Async thunk for fetching job by ID
export const fetchJobById = createAsyncThunk(
  "jobsData/fetchJobById",
  async (id: string, { rejectWithValue }) => {
    try {
      const job = await jobApi.getJobById(id);
      return job;
    } catch (error) {
      return rejectWithValue("Failed to fetch job");
    }
  }
);

const jobsDataSlice = createSlice({
  name: "jobsData",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    addAppliedJob: (state, action: PayloadAction<string>) => {
      if (!state.appliedJobs.includes(action.payload)) {
        state.appliedJobs.push(action.payload);
        // Update localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(
              "appliedJobs",
              JSON.stringify(state.appliedJobs)
            );
          } catch (error) {
            console.error("Error saving applied jobs to localStorage:", error);
          }
        }
      }
    },
    removeAppliedJob: (state, action: PayloadAction<string>) => {
      state.appliedJobs = state.appliedJobs.filter(
        (id) => id !== action.payload
      );
      // Update localStorage
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "appliedJobs",
            JSON.stringify(state.appliedJobs)
          );
        } catch (error) {
          console.error("Error saving applied jobs to localStorage:", error);
        }
      }
    },
    setFilters: (state, action: PayloadAction<Partial<JobFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        location: "",
        type: "",
        company: "",
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch job by ID
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        // Add the job to the jobs array if it doesn't exist
        if (
          action.payload &&
          !state.jobs.find((job) => job.id === action?.payload?.id)
        ) {
          state.jobs.push(action.payload);
        }
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setJobs,
  addAppliedJob,
  removeAppliedJob,
  setFilters,
  clearFilters,
  setLoading,
  setError,
} = jobsDataSlice.actions;

// Selectors
export const selectAllJobs = (state: { jobsData: JobsDataState }) =>
  state.jobsData.jobs;
export const selectAppliedJobs = (state: { jobsData: JobsDataState }) =>
  state.jobsData.appliedJobs;
export const selectFilters = (state: { jobsData: JobsDataState }) =>
  state.jobsData.filters;
export const selectLoading = (state: { jobsData: JobsDataState }) =>
  state.jobsData.loading;
export const selectError = (state: { jobsData: JobsDataState }) =>
  state.jobsData.error;

// Filtered jobs selector
export const selectFilteredJobs = (state: { jobsData: JobsDataState }) => {
  const { jobs, filters } = state.jobsData;

  return jobs.filter((job) => {
    const matchesSearch =
      !filters.search ||
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesType =
      !filters.type || job.type.toLowerCase() === filters.type.toLowerCase();

    const matchesCompany =
      !filters.company ||
      job.company.toLowerCase().includes(filters.company.toLowerCase());

    return matchesSearch && matchesLocation && matchesType && matchesCompany;
  });
};

// Check if job is applied
export const selectIsJobApplied =
  (jobId: string) => (state: { jobsData: JobsDataState }) =>
    state.jobsData.appliedJobs.includes(jobId);

export default jobsDataSlice.reducer;
