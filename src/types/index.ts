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
  logo: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: Company;
  rate: {
    min: number;
    max: number;
  };
  location: string;
  skills: string[];
  status: 'open' | 'closed';
  startDate: string;
  createdAt: Date;
  updatedAt: Date;
}