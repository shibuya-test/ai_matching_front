import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Engineer, Experience } from '@/types';
import Header from '@/components/Header';

const EngineerProfile: React.FC = () => {
  const router = useRouter();
  
  // 基本情報のstate
  const [basicInfo, setBasicInfo] = useState<Omit<Engineer, 'id' | 'experiences' | 'skills'>>({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    rate: {
      min: 0,
      max: 0
    }
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
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/engineer/login');
          return;
        }

        const response = await fetch('/api/engineer/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('プロフィールの取得に失敗しました');
        }

        const data = await response.json();
        setBasicInfo(data.basicInfo);
        setSkills(data.skills);
        setExperiences(data.experiences);
      } catch (err) {
        setError('プロフィールの取得に失敗しました');
      }
    };

    fetchProfile();
  }, [router]);

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('rate.')) {
      const rateField = name.split('.')[1];
      setBasicInfo(prev => ({
        ...prev,
        rate: {
          ...prev.rate,
          [rateField]: parseInt(value) || 0
        }
      }));
    } else {
      setBasicInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
      const newExperiences = [...prev];
      newExperiences[index] = {
        ...newExperiences[index],
        [field]: value
      };
      return newExperiences;
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
    setError('');
    setSuccessMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/engineer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...basicInfo,
          skills,
          experiences
        }),
      });

      if (!response.ok) {
        throw new Error('プロフィールの更新に失敗しました');
      }

      setSuccessMessage('プロフィールを更新しました');
    } catch (err) {
      setError('プロフィールの更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="engineer" />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">プロフィール編集</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本情報 */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">基本情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  名前
                </label>
                <input
                  type="text"
                  name="name"
                  value={basicInfo.name}
                  onChange={handleBasicInfoChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  name="email"
                  value={basicInfo.email}
                  onChange={handleBasicInfoChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  電話番号
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={basicInfo.phone}
                  onChange={handleBasicInfoChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  所在地
                </label>
                <input
                  type="text"
                  name="location"
                  value={basicInfo.location}
                  onChange={handleBasicInfoChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  自己紹介
                </label>
                <textarea
                  name="bio"
                  value={basicInfo.bio}
                  onChange={handleBasicInfoChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  最小単価（円/時）
                </label>
                <input
                  type="number"
                  name="rate.min"
                  value={basicInfo.rate.min}
                  onChange={handleBasicInfoChange}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  最大単価（円/時）
                </label>
                <input
                  type="number"
                  name="rate.max"
                  value={basicInfo.rate.max}
                  onChange={handleBasicInfoChange}
                  className="w-full px-3 py-2 border rounded-md"
                  min="0"
                />
              </div>
            </div>
          </section>

          {/* スキル */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">スキル</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md"
                  placeholder="新しいスキルを入力"
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
                {skills.map((skill) => (
                  <span
                    key={skill}
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
          </section>

          {/* 経験 */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">経験</h2>
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        会社名
                      </label>
                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        役職
                      </label>
                      <input
                        type="text"
                        value={experience.position}
                        onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        開始日
                      </label>
                      <input
                        type="date"
                        value={experience.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        終了日
                      </label>
                      <input
                        type="date"
                        value={experience.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        説明
                      </label>
                      <textarea
                        value={experience.description}
                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddExperience}
                className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
              >
                経験を追加
              </button>
            </div>
          </section>

          <div className="flex justify-end space-x-4">
            <Link
              href="/engineer/dashboard"
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              キャンセル
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EngineerProfile;
