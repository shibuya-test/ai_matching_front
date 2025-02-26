export interface Engineer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  rate: {
    min: number;
    max: number;
  };
  skills: string[];
  experiences: Experience[];
  experience: number;
  availableFrom: string;
  matchScore: number;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  location: string;
  employeeCount: string;
  websiteUrl: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  salary: string;
  location: string;
  skills: string[];
  postedAt: string;
  type: string;
  status?: 'open' | 'closed';
  applicantsCount?: number;
  createdAt?: string;
}

export interface Activity {
  id: string;
  type: string;
  message: string;
  date: string;
}

export interface EngineerPreferences {
  desiredSalary: string;
  desiredLocations: string[];
  skills: string[];
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
  total: number;
  statuses: {
    pending: number;
    interviewing: number;
    accepted: number;
    rejected: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'engineer' | 'company';
}

export interface Profile {
  name: string;
  email: string;
  bio: string;
  location: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

export interface Rating {
  id: string;
  projectName: string;
  companyName: string;
  score: number;
  comment: string;
  evaluatedAt: string;
  skills: string[];
  duration: string;
}

export interface FormData {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

export interface JobFilters {
  location: string;
  skills: string[];
  minSalary: number;
}