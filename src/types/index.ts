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
}

export interface Activity {
  id: string;
  type: 'message' | 'notification' | 'application';
  title: string;
  description: string;
  date: string;
  read: boolean;
}