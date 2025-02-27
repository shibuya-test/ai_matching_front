import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Job } from '@/types';

const JobsManagementPage: React.FC = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    const fetchJobs = async () => {
      try {
        // 開発用のダミーデータ
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
            type: '正社員',
            status: '募集中'
          },
          {
            id: '2',
            title: 'バックエンドエンジニア',
            company: '株式会社テクノロジー',
            description: 'Java、Spring Bootでのマイクロサービス開発',
            salary: '600,000 - 900,000円/月',
            location: '東京都渋谷区',
            skills: ['Java', 'Spring Boot', 'MySQL'],
            postedAt: '2024-01-18',
            type: '正社員',
            status: '募集停止'
          }
        ];
        setJobs(dummyJobs);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '案件情報の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="company" />
        <Sidebar userType="company" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] ml-64">
          <div className="text-xl text-gray-600">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="company" />
        <Sidebar userType="company" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] ml-64">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="company" />
      <Sidebar userType="company" />
      <main className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">案件管理</h1>
          <button
            onClick={() => router.push('/company/jobs/new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            新規案件作成
          </button>
        </div>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-gray-600 mb-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>勤務地: {job.location}</p>
                    <p>給与: {job.salary}</p>
                    <p>雇用形態: {job.type}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    job.status === '募集中' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                  <span className="text-sm text-gray-500 mt-2">
                    掲載日: {job.postedAt}
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => router.push(`/company/jobs/${job.id}/edit`)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  編集
                </button>
                <button
                  onClick={() => router.push(`/company/jobs/${job.id}/applications`)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  応募者一覧
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobsManagementPage;