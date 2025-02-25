import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Job, Activity } from '@/types';
import { JobCard } from '@/components/JobCard';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { 
  ArrowTrendingUpIcon, 
  ChatBubbleLeftRightIcon, 
  BellIcon 
} from '@heroicons/react/24/outline';

// ダミーデータの定義
const DUMMY_DATA = {
  jobs: [
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
      company: '株式会社スタートアップ',
      description: 'Next.js、TypeScriptでの開発',
      salary: '400,000 - 600,000円/月',
      location: '東京都港区',
      skills: ['Next.js', 'TypeScript', 'TailwindCSS'],
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
  ],
  activities: [
    {
      id: '1',
      type: 'message' as const,
      title: '面談のお誘い',
      description: '株式会社テクノロジーから面談のご案内が届いています',
      date: '2024-01-20',
      read: false
    },
    {
      id: '2',
      type: 'notification' as const,
      title: '新着案件のお知らせ',
      description: 'あなたのスキルにマッチする案件が追加されました',
      date: '2024-01-19',
      read: false
    },
    {
      id: '3',
      type: 'message' as const,
      title: '求人応募の結果',
      description: '株式会社スタートアップからの選考結果が届いています',
      date: '2024-01-18',
      read: false
    }
  ],
  matchScore: 85
};

const EngineerDashboard: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [matchScore, setMatchScore] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        // 開発環境用のダミーデータを使用
        setRecentJobs(DUMMY_DATA.jobs);
        setActivities(DUMMY_DATA.activities);
        setMatchScore(DUMMY_DATA.matchScore);
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
        <Header userType="engineer" />
        <Sidebar userType="engineer" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] ml-64">
          <div className="text-xl text-gray-600">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="engineer" />
        <Sidebar userType="engineer" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] ml-64">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="engineer" />
      <Sidebar userType="engineer" />

      <main className="ml-64 p-8">
        {/* AIマッチングスコア */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                AIマッチングスコア
              </h2>
              <div className="mt-2 text-4xl font-bold text-blue-600">
                {matchScore}%
              </div>
              <p className="text-sm text-gray-500">マッチング率の平均</p>
            </div>
            <div className="text-right">
              <p className="text-green-600 font-semibold">
                先週比 +5%
              </p>
              <p className="text-sm text-gray-500">
                スキルの向上が見られます
              </p>
            </div>
          </div>
        </div>

        {/* おすすめ案件 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">あなたにおすすめの案件</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job}
                matchScore={Math.round(Math.random() * 20 + 70)} // 70-90%のランダムなスコア
              />
            ))}
          </div>
        </section>

        {/* アクティビティ */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* メッセージ */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">最近のメッセージ</h3>
              </div>
              <Link 
                href="/engineer/messages"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                すべて見る
              </Link>
            </div>
            {activities
              .filter(activity => activity.type === 'message')
              .slice(0, 3)
              .map(message => (
                <div 
                  key={message.id}
                  className="py-3 border-b last:border-b-0"
                >
                  <p className="font-medium">{message.title}</p>
                  <p className="text-sm text-gray-600">{message.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{message.date}</p>
                </div>
              ))}
          </div>

          {/* お知らせ */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BellIcon className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">お知らせ</h3>
              </div>
              <Link 
                href="/engineer/notifications"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                すべて見る
              </Link>
            </div>
            {activities
              .filter(activity => activity.type === 'notification')
              .slice(0, 3)
              .map(notification => (
                <div 
                  key={notification.id}
                  className="py-3 border-b last:border-b-0"
                >
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default EngineerDashboard;
