import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Job } from '@/types';
import { JobCard } from '@/components/JobCard';
import Header from '@/components/Header';

const EngineerDashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);

  useEffect(() => {
    // トークンの確認
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    // 求人情報の取得
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('求人情報の取得に失敗しました');
        }
        const data = await response.json();
        setRecentJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '求人情報の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="engineer" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-xl text-gray-600">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="engineer" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="engineer" />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">おすすめの案件</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">最近の活動</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">まだ活動履歴はありません。</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EngineerDashboard;
