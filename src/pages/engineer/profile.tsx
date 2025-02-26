import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';

interface Profile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

const EngineerProfile: React.FC = () => {
  const router = useRouter();
  
  // 基本情報のstate
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });

  // スキル情報のstate
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  // 経験情報のstate
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ]);

  // メッセージ状態
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    // プロフィールが既に完了している場合はダッシュボードへ
    const profileCompleted = localStorage.getItem('profileCompleted');
    if (profileCompleted === 'true') {
      router.push('/engineer/dashboard');
      return;
    }

    // 開発用のダミーデータ
    const dummyProfile = {
      name: 'テスト太郎',
      email: 'test@example.com',
      phone: '090-1234-5678',
      location: '東京都渋谷区',
      bio: 'フルスタックエンジニアとして5年の経験があります。'
    };

    // ダミーデータを使用
    setProfile(dummyProfile);
    setSkills(['JavaScript', 'React', 'Node.js']);
    setExperiences([
      {
        company: 'テスト会社',
        position: 'エンジニア',
        startDate: '2020-01-01',
        endDate: '2020-12-31',
        description: 'フルスタックエンジニアとしての業務を行いました。'
      }
    ]);
    setLoading(false);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills(prev => [...prev, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    setExperiences(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return updated;
    });
  };

  const handleAddExperience = () => {
    setExperiences(prev => [...prev, {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // APIエンドポイントが実装されたら有効化
      // const response = await fetch('/api/engineer/profile', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify({
      //     profile,
      //     skills,
      //     experiences
      //   })
      // });

      // if (!response.ok) throw new Error('プロフィールの保存に失敗しました');

      // 開発用の仮実装
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // プロフィール完了フラグを設定
      localStorage.setItem('profileCompleted', 'true');
      
      setSuccessMessage('プロフィールを保存しました');
      
      // AIヒアリングページへリダイレクト
      router.push('/engineer/ai-wizard');
    } catch (err) {
      setError('エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="engineer" />
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl text-gray-600">読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="engineer" />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">プロフィール設定</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 基本情報 */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">基本情報</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    名前
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    所在地
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    自己紹介
                  </label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* スキル */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">スキル</h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="新しいスキルを追加"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    追加
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 職歴 */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">職歴</h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-b pb-6 last:border-b-0">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">職歴 {index + 1}</h3>
                      {experiences.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          削除
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          会社名
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          役職
                        </label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            開始日
                          </label>
                          <input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            終了日
                          </label>
                          <input
                            type="date"
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          業務内容
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  職歴を追加
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isSubmitting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isSubmitting ? '保存中...' : '保存'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EngineerProfile;
