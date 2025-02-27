// ユーザー関連の型定義
export type UserType = 'engineer' | 'company';

// プロジェクト（案件）の型定義
export type Project = {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  description: string;
  requiredSkills: string[];
  duration: string;
  budget: number;
  status: 'open' | 'in_progress' | 'completed';
  createdAt: string;
  startDate?: string;
  endDate?: string;
};

// エンジニアの型定義
export type Engineer = {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience: number;
  hourlyRate: number;
  availability: string;
  bio: string;
  imageUrl?: string;
};

// 職務経験の型定義
export type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

// メッセージの型定義
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

// 企業プロフィールフォームデータの型定義
export type CompanyProfileFormData = {
  name: string;
  email: string;
  description: string;
  industry: string;
  employeeCount: string;
  location: string;
  website: string;
  contactPerson: string;
  contactPhone: string;
};

// 求人情報の型定義
export type Job = {
  id: string;
  title: string;
  company: string;
  description: string;
  salary: string;
  location: string;
  skills: string[];
  postedAt: string;
  type: string;
};

// 活動履歴の型定義
export type Activity = {
  id: string;
  type: 'application' | 'interview' | 'offer';
  title: string;
  company: string;
  date: string;
  status: string;
};

// 応募情報の型定義
export type Application = {
  id: string;
  engineerId: string;
  engineerName: string;
  projectId: string;
  projectTitle: string;
  appliedAt: string;
  status: 'pending' | 'document_screening' | 'interview_scheduling' | 'accepted' | 'rejected';
  note: string;
  resume: string;
};

// フォームデータの型定義
export type FormData = {
  email: string;
  password: string;
};

// 登録フォームデータの型定義
export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// レーティングの型定義
export type Rating = {
  id: string;
  projectName: string;
  companyName: string;
  score: number;
  comment: string;
  evaluatedAt: string;
  skills: string[];
  duration: string;
};

export type Company = {
  id: string;
  name: string;
  email: string;
  industry: string;
  description: string;
  location: string;
  establishedYear: number;
  employeeCount: number;
  websiteUrl?: string;
  logoUrl?: string;
};