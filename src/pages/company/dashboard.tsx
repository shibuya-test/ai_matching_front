import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

// 型定義
type ApplicationStatuses = {
  total: number;
  statuses: {
    pending: number;
    interviewing: number;
    accepted: number;
    rejected: number;
  };
};

type Engineer = {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  matchScore: number;
  availableFrom: string;
};

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
  const [applications, setApplications] = useState<ApplicationStatuses | null>(null);
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

        {/* 応募状況の概要 */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-4">応募状況</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-500 text-white rounded-lg p-6">
              <h3 className="text-lg font-medium">全応募数</h3>
              <p className="text-3xl font-bold mt-2">{applications?.total || 0}</p>
            </div>
            <div className="bg-yellow-500 text-white rounded-lg p-6">
              <h3 className="text-lg font-medium">書類選考中</h3>
              <p className="text-3xl font-bold mt-2">{applications?.statuses.pending || 0}</p>
            </div>
            <div className="bg-purple-500 text-white rounded-lg p-6">
              <h3 className="text-lg font-medium">面接調整中</h3>
              <p className="text-3xl font-bold mt-2">{applications?.statuses.interviewing || 0}</p>
            </div>
            <div className="bg-green-500 text-white rounded-lg p-6">
              <h3 className="text-lg font-medium">内定承諾</h3>
              <p className="text-3xl font-bold mt-2">{applications?.statuses.accepted || 0}</p>
            </div>
          </div>
        </section>

        {/* おすすめエンジニア */}
        <section>
          <h2 className="text-xl font-medium mb-4">おすすめエンジニア</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedEngineers.map((engineer) => (
              <div
                key={engineer.id}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/company/engineers/${engineer.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{engineer.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">経験年数: {engineer.experience}年</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    マッチ度: {engineer.matchScore}%
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {engineer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-gray-100 text-gray-800 text-sm px-2.5 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  稼働開始可能: {new Date(engineer.availableFrom).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyDashboard;