import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Rating } from '@/types';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { RatingCard } from '@/components/RatingCard';
import { RatingDetailModal } from '@/components/RatingDetailModal';
import { StarIcon } from '@heroicons/react/24/solid';

const MyRatingsPage: React.FC = () => {
  const router = useRouter();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageScore, setAverageScore] = useState(0);
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    const fetchRatings = async () => {
      try {
        // 開発用のダミーデータ
        const dummyRatings: Rating[] = [
          {
            id: '1',
            projectName: 'ECサイトリニューアル',
            companyName: '株式会社テクノロジー',
            score: 4.5,
            comment: '期待以上のパフォーマンスを発揮してくれました。特にフロントエンド開発での技術力が高く評価されました。',
            evaluatedAt: '2024-01-15',
            skills: ['React', 'TypeScript', 'Node.js'],
            duration: '2023/07 - 2023/12'
          },
          {
            id: '2',
            projectName: '在庫管理システム開発',
            companyName: '株式会社システム',
            score: 4.2,
            comment: 'バックエンド開発での知識が豊富で、チーム全体の生産性向上に貢献してくれました。',
            evaluatedAt: '2023-12-20',
            skills: ['Java', 'Spring Boot', 'PostgreSQL'],
            duration: '2023/04 - 2023/09'
          },
          {
            id: '3',
            projectName: 'モバイルアプリ開発',
            companyName: '株式会社アプリ',
            score: 4.8,
            comment: 'モバイルアプリ開発の経験を活かし、品質の高い成果物を提供していただきました。',
            evaluatedAt: '2023-11-10',
            skills: ['React Native', 'TypeScript', 'Firebase'],
            duration: '2023/01 - 2023/06'
          }
        ];

        setRatings(dummyRatings);
        const avgScore = dummyRatings.reduce((acc, curr) => acc + curr.score, 0) / dummyRatings.length;
        setAverageScore(Math.round(avgScore * 10) / 10);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '評価データの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchRatings();
  }, [router]);

  const getSortedAndFilteredRatings = () => {
    let filtered = ratings;
    
    if (searchQuery) {
      filtered = filtered.filter(rating => 
        rating.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rating.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.evaluatedAt).getTime() - new Date(a.evaluatedAt).getTime();
      }
      return b.score - a.score;
    });
  };

  const handleRatingClick = (rating: Rating) => {
    setSelectedRating(rating);
    setIsModalOpen(true);
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
        <h1 className="text-2xl font-semibold mb-6">過去案件の評価一覧</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">総合評価</h2>
            <div className="flex items-center">
              <StarIcon className="w-6 h-6 text-yellow-400 mr-2" />
              <span className="text-2xl font-bold">{averageScore}</span>
              <span className="text-gray-500 ml-2">/ 5.0</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="プロジェクト名や企業名で検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="ml-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">日付順</option>
                <option value="score">評価順</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {getSortedAndFilteredRatings().map((rating) => (
            <RatingCard 
              key={rating.id} 
              rating={rating} 
              onClickDetail={handleRatingClick}
            />
          ))}
        </div>

        {selectedRating && (
          <RatingDetailModal
            rating={selectedRating}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>
    </div>
  );
};

export default MyRatingsPage;