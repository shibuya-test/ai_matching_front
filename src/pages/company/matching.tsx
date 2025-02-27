import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { EngineerCard } from '@/components/EngineerCard';

// 型定義
type Engineer = {
  id: string;
  name: string;
  email: string;
  introduction: string;
  skills: string[];
  experience: number;
  matchScore: number;
  availableFrom: string;
  preferences: {
    workLocation: string;
    workType: string;
    salary: string;
  };
  matchedJobs: {
    id: string;
    title: string;
    matchScore: number;
  }[];
};

type Filters = {
  skills: string[];
  experienceMin: number;
  workType: string;
};

// 開発用のダミーデータ
const DUMMY_MATCHING_ENGINEERS: Engineer[] = [
  {
    id: '1',
    name: '山田太郎',
    email: 'yamada@example.com',
    introduction: 'フルスタックエンジニアとして5年の経験があります。',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    experience: 5,
    matchScore: 89,
    availableFrom: '2024-04-01',
    preferences: {
      workLocation: 'リモート可',
      workType: '正社員',
      salary: '600,000 - 800,000円/月',
    },
    matchedJobs: [
      { id: 'job1', title: 'フルスタックエンジニア', matchScore: 89 },
      { id: 'job2', title: 'フロントエンドリード', matchScore: 85 }
    ]
  },
  {
    id: '2',
    name: '鈴木花子',
    email: 'suzuki@example.com',
    introduction: 'バックエンドエンジニアとして3年の経験があります。',
    skills: ['Python', 'Django', 'AWS', 'Docker'],
    experience: 3,
    matchScore: 75,
    availableFrom: '2024-05-01',
    preferences: {
      workLocation: '東京',
      workType: '業務委託',
      salary: '800,000 - 1,000,000円/月',
    },
    matchedJobs: [
      { id: 'job3', title: 'バックエンドエンジニア', matchScore: 75 },
      { id: 'job4', title: 'インフラエンジニア', matchScore: 70 }
    ]
  },
  {
    id: '3',
    name: '佐藤次郎',
    email: 'sato@example.com',
    introduction: 'フロントエンドエンジニアとして2年の経験があります。',
    skills: ['React', 'Vue.js', 'JavaScript', 'TypeScript'],
    experience: 2,
    matchScore: 82,
    availableFrom: '2024-03-15',
    preferences: {
      workLocation: '大阪',
      workType: '正社員',
      salary: '400,000 - 600,000円/月',
    },
    matchedJobs: [
      { id: 'job5', title: 'フロントエンドエンジニア', matchScore: 82 },
      { id: 'job6', title: 'Webアプリケーション開発', matchScore: 78 }
    ]
  },
  {
    id: '4',
    name: '田中三郎',
    email: 'tanaka@example.com',
    introduction: 'インフラエンジニアとして7年の経験があります。',
    skills: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform'],
    experience: 7,
    matchScore: 92,
    availableFrom: '2024-06-01',
    preferences: {
      workLocation: 'リモート可',
      workType: '契約社員',
      salary: '900,000 - 1,200,000円/月',
    },
    matchedJobs: [
      { id: 'job7', title: 'インフラエンジニア（リード）', matchScore: 92 },
      { id: 'job8', title: 'DevOpsエンジニア', matchScore: 88 }
    ]
  },
  {
    id: '5',
    name: '中村四郎',
    email: 'nakamura@example.com',
    introduction: 'モバイルアプリ開発者として4年の経験があります。',
    skills: ['React Native', 'TypeScript', 'Firebase', 'iOS', 'Android'],
    experience: 4,
    matchScore: 85,
    availableFrom: '2024-04-15',
    preferences: {
      workLocation: '福岡',
      workType: '正社員',
      salary: '500,000 - 700,000円/月',
    },
    matchedJobs: [
      { id: 'job9', title: 'モバイルアプリエンジニア', matchScore: 85 },
      { id: 'job10', title: 'クロスプラットフォーム開発', matchScore: 80 }
    ]
  }
];

const AVAILABLE_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Django', 'AWS',
  'Docker', 'Kubernetes', 'GCP', 'Vue.js', 'JavaScript', 'Terraform',
  'React Native', 'Firebase', 'iOS', 'Android'
];

const WORK_TYPES = ['all', '正社員', '契約社員', '業務委託'];

const MatchingPage: React.FC = () => {
  const router = useRouter();
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    skills: [],
    experienceMin: 0,
    workType: 'all',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    const fetchMatchingEngineers = async () => {
      try {
        // 開発用のダミーデータを使用
        setEngineers(DUMMY_MATCHING_ENGINEERS);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エンジニア情報の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchMatchingEngineers();
  }, [router]);

  const filteredEngineers = engineers.filter(engineer => {
    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.every(skill => engineer.skills.includes(skill));
    const matchesExperience = engineer.experience >= filters.experienceMin;
    const matchesWorkType = filters.workType === 'all' || 
      engineer.preferences.workType === filters.workType;

    return matchesSkills && matchesExperience && matchesWorkType;
  });

  const handleLinkEngineerToJob = async (engineerId: string, jobId: string) => {
    try {
      // APIコール（現在はモック）
      console.log(`エンジニア(${engineerId})を案件(${jobId})に紐付けました`);
      alert('紐付けが完了しました');
    } catch (err) {
      alert('紐付けに失敗しました');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="company" />
        <Sidebar userType="company" />
        <main className="ml-64 p-8">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">読み込み中...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="company" />
        <Sidebar userType="company" />
        <main className="ml-64 p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="company" />
      <Sidebar userType="company" />
      <main className="ml-64 p-8">
        <h1 className="text-2xl font-semibold mb-6">マッチングエンジニア</h1>

        {/* フィルターセクション */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">フィルター</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                必要スキル
              </label>
              <select
                multiple
                className="w-full border rounded-md px-3 py-2"
                value={filters.skills}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                  setFilters(prev => ({ ...prev, skills: selected }));
                }}
              >
                {AVAILABLE_SKILLS.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                最小経験年数
              </label>
              <input
                type="number"
                min="0"
                className="w-full border rounded-md px-3 py-2"
                value={filters.experienceMin}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  experienceMin: parseInt(e.target.value) || 0 
                }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                雇用形態
              </label>
              <select
                className="w-full border rounded-md px-3 py-2"
                value={filters.workType}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  workType: e.target.value 
                }))}
              >
                {WORK_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'すべて' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* エンジニア一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEngineers.map((engineer) => (
            <div key={engineer.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{engineer.name}</h3>
                  <p className="text-sm text-gray-500">経験年数: {engineer.experience}年</p>
                </div>
                <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  マッチ度: {engineer.matchScore}%
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">
                    稼働開始可能: {new Date(engineer.availableFrom).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    希望雇用形態: {engineer.preferences.workType}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">スキル</h4>
                  <div className="flex flex-wrap gap-2">
                    {engineer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">マッチする案件</h4>
                  <div className="space-y-2">
                    {engineer.matchedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="text-sm p-2 bg-gray-50 rounded flex justify-between items-center"
                      >
                        <span>{job.title}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600 font-medium">{job.matchScore}%</span>
                          <button
                            onClick={() => handleLinkEngineerToJob(engineer.id, job.id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            紐付け
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/company/engineers/${engineer.id}`)}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  詳細を見る
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MatchingPage;