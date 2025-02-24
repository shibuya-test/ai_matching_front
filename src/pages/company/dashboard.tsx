import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';

interface Job {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
  applicantsCount: number;
  createdAt: string;
}

const CompanyDashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // トークンの確認
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    // 求人情報の取得（開発用のダミーデータ）
    const dummyJobs: Job[] = [
      {
        id: '1',
        title: 'フルスタックエンジニア募集',
        description: 'React、Node.js、TypeScriptの経験者を募集しています。',
        status: 'open',
        applicantsCount: 5,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        title: 'バックエンドエンジニア募集',
        description: 'Java、Spring Bootでの開発経験者を募集しています。',
        status: 'open',
        applicantsCount: 3,
        createdAt: '2024-01-10'
      }
    ];

    setJobs(dummyJobs);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="company" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-xl text-gray-600">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="company" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="company" />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <Link
            href="/company/jobs/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            新規求人作成
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">求人一覧</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-600">現在、公開中の求人はありません。</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{job.description}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        投稿日: {job.createdAt}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status === 'open' ? '募集中' : '募集終了'}
                      </span>
                      <div className="mt-2 text-sm text-gray-600">
                        応募者数: {job.applicantsCount}名
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    <Link
                      href={`/company/jobs/${job.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      編集
                    </Link>
                    <Link
                      href={`/company/jobs/${job.id}/applicants`}
                      className="text-green-600 hover:text-green-800"
                    >
                      応募者確認
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">最近の活動</h2>
          <p className="text-gray-600">
            まだ活動履歴はありません。
          </p>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
