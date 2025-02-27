import React, { useState, useEffect } from 'react';
import { Job } from '@/types';
import { JobCard } from '@/components/JobCard';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface FilterOptions {
  location: string;
  skills: string[];
  minSalary: number;
  maxSalary: number;
}

// 共通のスキルリスト
const COMMON_SKILLS = [
  'React', 'Vue.js', 'TypeScript', 'JavaScript',
  'Node.js', 'Python', 'Go', 'Java',
  'Docker', 'Kubernetes', 'AWS', 'GCP'
];

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    skills: [],
    minSalary: 0,
    maxSalary: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // APIエンドポイントが実装されたら置き換え
        const dummyJobs = [
          {
            id: '1',
            title: 'フルスタックエンジニア',
            company: '株式会社テクノロジー',
            description: 'React、Node.js、TypeScriptの経験者募集',
            salary: '500,000 - 800,000円/月',
            location: '東京都渋谷区',
            skills: ['React', 'Node.js', 'TypeScript'],
            postedAt: '2024-01-20',
            type: '正社員'
          },
          {
            id: '2',
            title: 'フロントエンドエンジニア',
            company: '株式会社ウェブ',
            description: 'モダンなWebアプリケーション開発',
            salary: '450,000 - 700,000円/月',
            location: '東京都新宿区',
            skills: ['React', 'Vue.js', 'JavaScript'],
            postedAt: '2024-01-19',
            type: '正社員'
          },
          {
            id: '3',
            title: 'バックエンドエンジニア',
            company: '株式会社テック',
            description: 'Go言語でのマイクロサービス開発',
            salary: '600,000 - 900,000円/月',
            location: '東京都千代田区',
            skills: ['Go', 'Docker', 'Kubernetes'],
            postedAt: '2024-01-18',
            type: '正社員'
          }
        ];
        setJobs(dummyJobs);
        setFilteredJobs(dummyJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : '求人情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 検索とフィルタリングの処理
  useEffect(() => {
    let result = [...jobs];
    
    // キーワード検索
    if (searchQuery) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // フィルター適用
    if (filters.location) {
      result = result.filter(job => job.location.includes(filters.location));
    }
    if (filters.skills.length > 0) {
      result = result.filter(job => 
        filters.skills.every(skill => job.skills.includes(skill))
      );
    }
    if (filters.minSalary > 0) {
      result = result.filter(job => {
        const minSalary = parseInt(job.salary.split('-')[0].replace(/[^0-9]/g, ''));
        return minSalary >= filters.minSalary;
      });
    }

    setFilteredJobs(result);
    setCurrentPage(1);
  }, [searchQuery, filters, jobs]);

  // ページネーション
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="engineer" />
        <Sidebar userType="engineer" />
        <div className="ml-64 p-8">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="engineer" />
        <Sidebar userType="engineer" />
        <div className="ml-64 p-8">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="engineer" />
      <Sidebar userType="engineer" />
      
      <main className="ml-64 p-8">
        <h1 className="text-2xl font-semibold mb-6">求人情報一覧</h1>
        
        {/* 検索とフィルター */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {/* 検索バー */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="キーワードで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          {/* フィルター */}
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">勤務地を選択</option>
              <option value="東京都">東京都</option>
              <option value="大阪府">大阪府</option>
              <option value="愛知県">愛知県</option>
              <option value="福岡県">福岡県</option>
            </select>

            {/* 給与範囲フィルター */}
            <select
              value={filters.minSalary}
              onChange={(e) => setFilters({...filters, minSalary: Number(e.target.value)})}
              className="border rounded-lg px-4 py-2"
            >
              <option value="0">最低給与</option>
              <option value="300000">30万円以上</option>
              <option value="400000">40万円以上</option>
              <option value="500000">50万円以上</option>
              <option value="600000">60万円以上</option>
            </select>

            {/* スキルフィルター */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {COMMON_SKILLS.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      setFilters(prev => ({
                        ...prev,
                        skills: prev.skills.includes(skill)
                          ? prev.skills.filter(s => s !== skill)
                          : [...prev.skills, skill]
                      }))
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.skills.includes(skill)
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 求人一覧 */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentJobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job}
              matchScore={Math.round(Math.random() * 20 + 70)}
            />
          ))}
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsPage;
