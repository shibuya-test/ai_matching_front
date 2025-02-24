import React, { useEffect, useState } from 'react';
import { Job } from '@/types';
import { JobCard } from '@/components/JobCard';
import Header from '@/components/Header';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('求人情報の取得に失敗しました');
        }
        const data = await response.json();
        setJobs(data);
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
        <Header userType="public" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8 text-gray-600">
            読み込み中...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="public" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8 text-red-600">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="public" />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">求人案件一覧</h1>
        
        {jobs.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            現在、募集中の案件はありません。
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsPage;
