import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ApplyCompleteModal from '@/components/ApplyCompleteModal';
import { Job, Application } from '@/types';
import { toast } from 'react-hot-toast';
import { 
  BuildingOfficeIcon, 
  CurrencyYenIcon, 
  MapPinIcon,
  CalendarIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

const JobDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    if (!id) return;

    const fetchJobDetail = async () => {
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
        ];

        const foundJob = dummyJobs.find(j => j.id === id);
        if (!foundJob) throw new Error('求人が見つかりません');
        
        // 既に応募済みかチェック
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        const applied = applications.some((app: Application) => app.jobId === id);
        setHasApplied(applied);
        
        setJob(foundJob);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '求人情報の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [id, router]);

  const saveApplication = (jobData: Job) => {
    try {
      // 既存の応募履歴を取得
      const applications: Application[] = JSON.parse(
        localStorage.getItem('applications') || '[]'
      );

      // 新しい応募を追加
      const newApplication: Application = {
        id: Date.now().toString(),
        jobId: jobData.id,
        jobTitle: jobData.title,
        company: jobData.company,
        appliedAt: new Date().toISOString(),
        status: 'pending'
      };

      // 応募履歴を更新
      localStorage.setItem(
        'applications',
        JSON.stringify([...applications, newApplication])
      );

      setHasApplied(true);
    } catch (err) {
      console.error('応募履歴の保存に失敗しました:', err);
      toast.error('応募履歴の保存に失敗しました');
    }
  };

  const handleApply = async () => {
    if (hasApplied) {
      toast.error('この求人には既に応募済みです');
      return;
    }

    try {
      setApplying(true);
      // 応募処理をシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (job) {
        saveApplication(job);
        setShowModal(true);
      }
    } catch (err) {
      setError('応募処理に失敗しました');
      toast.error('応募処理に失敗しました');
    } finally {
      setApplying(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push('/engineer/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="engineer" />
        <Sidebar userType="engineer" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] ml-64">
          <div className="text-xl text-gray-600">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="engineer" />
        <Sidebar userType="engineer" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] ml-64">
          <div className="text-xl text-red-600">{error || '求人が見つかりません'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="engineer" />
      <Sidebar userType="engineer" />
      <main className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <BuildingOfficeIcon className="w-6 h-6 mr-2" />
              <span className="text-xl font-medium">{job.company}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <CurrencyYenIcon className="w-6 h-6 mr-2" />
                <span className="text-lg">{job.salary}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPinIcon className="w-6 h-6 mr-2" />
                <span className="text-lg">{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CalendarIcon className="w-6 h-6 mr-2" />
                <span className="text-lg">掲載日: {job.postedAt}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BriefcaseIcon className="w-6 h-6 mr-2" />
                <span className="text-lg font-medium text-blue-600">{job.type}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">必要なスキル</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">職務内容</h2>
              <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                {job.description}
              </p>
            </div>

            <button
              onClick={handleApply}
              disabled={applying || hasApplied}
              className={`w-full py-4 rounded-lg text-white font-medium text-lg transition-colors ${
                hasApplied
                  ? 'bg-gray-400 cursor-not-allowed'
                  : applying
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {hasApplied 
                ? '応募済み'
                : applying
                  ? '応募中...'
                  : 'この求人に応募する'
              }
            </button>
          </div>
        </div>
      </main>

      <ApplyCompleteModal
        isOpen={showModal}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default JobDetailPage;
