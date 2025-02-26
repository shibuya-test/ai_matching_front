import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { EngineerCard } from '@/components/EngineerCard';
import { ApplicationStatusCard } from '@/components/ApplicationStatusCard';
import { Engineer, Application } from '@/types';

// 開発用のダミーデータ
const DUMMY_DATA = {
  applications: {
    total: 15,
    statuses: {
      pending: 5,
      interviewing: 3,
      accepted: 2,
      rejected: 5
    }
  },
  recommendedEngineers: [
    {
      id: '1',
      name: '山田太郎',
      skills: ['React', 'TypeScript', 'Node.js'],
      experience: 5,
      matchScore: 89,
      availableFrom: '2024-04-01'
    },
    {
      id: '2',
      name: '鈴木花子',
      skills: ['Python', 'Django', 'AWS'],
      experience: 3,
      matchScore: 85,
      availableFrom: '2024-03-01'
    },
    {
      id: '3',
      name: '佐藤次郎',
      skills: ['Java', 'Spring Boot', 'MySQL'],
      experience: 7,
      matchScore: 82,
      availableFrom: '2024-05-01'
    }
  ]
};

const CompanyDashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application | null>(null);
  const [recommendedEngineers, setRecommendedEngineers] = useState<Engineer[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // 開発用のダミーデータを使用
        setApplications(DUMMY_DATA.applications);
        setRecommendedEngineers(DUMMY_DATA.recommendedEngineers);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'データの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchDashboardData();
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
        <h1 className="text-2xl font-semibold mb-8">ダッシュボード</h1>

        {/* 応募状況のサマリー */}
        {applications && (
          <div className="grid grid-cols-4 gap-6 mb-8">
            <ApplicationStatusCard
              title="全応募"
              count={applications.total}
              colorClass="bg-blue-500"
            />
            <ApplicationStatusCard
              title="選考中"
              count={applications.statuses.pending}
              colorClass="bg-yellow-500"
            />
            <ApplicationStatusCard
              title="面接予定"
              count={applications.statuses.interviewing}
              colorClass="bg-green-500"
            />
            <ApplicationStatusCard
              title="選考完了"
              count={applications.statuses.accepted + applications.statuses.rejected}
              colorClass="bg-gray-500"
            />
          </div>
        )}

        {/* おすすめエンジニア */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">おすすめエンジニア</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedEngineers.map((engineer) => (
              <EngineerCard
                key={engineer.id}
                engineer={engineer}
                onClick={() => router.push(`/company/engineers/${engineer.id}`)}
              />
            ))}
          </div>
        </section>

        {/* 最近の活動 */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium mb-4">最近の活動</h2>
          {/* 活動履歴のリスト - 後で実装 */}
          <p className="text-gray-500">現在の活動はありません</p>
        </section>
      </main>
    </div>
  );
};

export default CompanyDashboard;
