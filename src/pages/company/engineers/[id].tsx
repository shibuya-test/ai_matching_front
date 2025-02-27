import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

// 型定義
type Engineer = {
  id: string;
  name: string;
  email: string;
  introduction: string;
  skills: string[];
  experience: number;
  preferences: {
    workLocation: string;
    workType: string;
    salary: string;
  };
  evaluations: {
    id: string;
    projectName: string;
    companyName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  resumeUrl?: string;
};

type OfferFormData = {
  position: string;
  salary: string;
  workLocation: string;
  workType: string;
  startDate: string;
  message: string;
};

// 開発用のダミーデータ
const DUMMY_ENGINEER: Engineer = {
  id: '1',
  name: '山田太郎',
  email: 'yamada@example.com',
  introduction: 'フルスタックエンジニアとして5年の経験があります。主にReact、TypeScript、Node.jsを使用した開発を得意としています。',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
  experience: 5,
  preferences: {
    workLocation: 'リモート可',
    workType: '正社員',
    salary: '600,000 - 800,000円/月',
  },
  evaluations: [
    {
      id: 'eval1',
      projectName: 'ECサイトリニューアル',
      companyName: '株式会社ABC',
      rating: 4.5,
      comment: '期待以上のパフォーマンスを発揮してくれました。特にフロントエンド開発での技術力が高く、チーム内でも良い影響を与えてくれました。',
      date: '2023-12-01',
    },
    {
      id: 'eval2',
      projectName: '社内システム開発',
      companyName: '株式会社XYZ',
      rating: 4.0,
      comment: '要件定義から実装まで、幅広く対応していただきました。コミュニケーション能力も高く、プロジェクトを成功に導いてくれました。',
      date: '2023-09-15',
    },
  ],
  resumeUrl: '/resumes/yamada.pdf',
};

const EngineerDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [engineer, setEngineer] = useState<Engineer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [offerData, setOfferData] = useState<OfferFormData>({
    position: '',
    salary: '',
    workLocation: '',
    workType: '正社員',
    startDate: '',
    message: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    if (!id) return;

    const fetchEngineerDetail = async () => {
      try {
        // 開発用のダミーデータを使用
        setEngineer(DUMMY_ENGINEER);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エンジニア情報の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchEngineerDetail();
  }, [id, router]);

  const handleOfferDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOfferData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // APIコール（現在はモック）
      console.log('送信するオファー内容:', offerData);
      alert('オファーを送信しました');
      setShowModal(false);
      // フォームをリセット
      setOfferData({
        position: '',
        salary: '',
        workLocation: '',
        workType: '正社員',
        startDate: '',
        message: '',
      });
    } catch (err) {
      alert('オファーの送信に失敗しました');
    }
  };

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

  if (error || !engineer) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="company" />
        <Sidebar userType="company" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] ml-64">
          <div className="text-xl text-red-600">{error || 'エンジニアが見つかりませんでした'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="company" />
      <Sidebar userType="company" />
      
      <main className="ml-64 p-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{engineer.name}</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            オファーを送る
          </button>
        </div>

        {/* プロフィール情報 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">プロフィール</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-gray-600">自己紹介</h3>
              <p className="mt-1">{engineer.introduction}</p>
            </div>
            <div>
              <h3 className="text-gray-600">スキル</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {engineer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-gray-600">希望条件</h3>
              <div className="mt-1 space-y-2">
                <p>勤務地: {engineer.preferences.workLocation}</p>
                <p>雇用形態: {engineer.preferences.workType}</p>
                <p>希望給与: {engineer.preferences.salary}</p>
              </div>
            </div>
            {engineer.resumeUrl && (
              <div>
                <h3 className="text-gray-600">履歴書</h3>
                <a
                  href={engineer.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-1 inline-block"
                >
                  履歴書を閲覧する
                </a>
              </div>
            )}
          </div>
        </div>

        {/* 過去案件評価 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium mb-4">過去案件評価</h2>
          <div className="space-y-6">
            {engineer.evaluations.map((evaluation) => (
              <div
                key={evaluation.id}
                className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{evaluation.projectName}</h3>
                    <p className="text-sm text-gray-600">{evaluation.companyName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-500">
                      {'★'.repeat(Math.floor(evaluation.rating))}
                      {evaluation.rating % 1 !== 0 && '☆'}
                    </div>
                    <p className="text-sm text-gray-600">
                      {new Date(evaluation.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{evaluation.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* オファー送信モーダル */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 my-8">
              <div className="max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">オファーを送信</h2>
                <form id="offerForm" onSubmit={handleSendOffer} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ポジション
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={offerData.position}
                      onChange={handleOfferDataChange}
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      給与
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={offerData.salary}
                      onChange={handleOfferDataChange}
                      className="w-full border rounded-md px-3 py-2"
                      placeholder="例: 600,000 - 800,000円/月"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      勤務地
                    </label>
                    <input
                      type="text"
                      name="workLocation"
                      value={offerData.workLocation}
                      onChange={handleOfferDataChange}
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      雇用形態
                    </label>
                    <select
                      name="workType"
                      value={offerData.workType}
                      onChange={handleOfferDataChange}
                      className="w-full border rounded-md px-3 py-2"
                      required
                    >
                      <option value="正社員">正社員</option>
                      <option value="契約社員">契約社員</option>
                      <option value="業務委託">業務委託</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      想定入社日
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={offerData.startDate}
                      onChange={handleOfferDataChange}
                      className="w-full border rounded-md px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      メッセージ
                    </label>
                    <textarea
                      name="message"
                      value={offerData.message}
                      onChange={handleOfferDataChange}
                      className="w-full border rounded-md px-3 py-2 h-32"
                      placeholder="エンジニアへのメッセージを入力してください"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  form="offerForm"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  送信する
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EngineerDetailPage;
