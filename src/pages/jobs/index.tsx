import React, { useState, useEffect } from 'react';
import { Job } from '@/types';
import { JobCard } from '@/components/JobCard';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
            type: '正社員'
          },
          // ... 他の求人データ
        ];
        setJobs(dummyJobs);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '求人情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job}
              matchScore={Math.round(Math.random() * 20 + 70)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
