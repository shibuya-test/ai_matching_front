import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Switch } from '@/components/Switch';
import { Project } from '@/types';

// ダミーデータの参照
const DUMMY_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'フルスタックエンジニア',
    description: 'React、Node.js、TypeScriptの経験者募集',
    salary: '500,000 - 800,000円/月',
    location: '東京都渋谷区',
    skills: ['React', 'Node.js', 'TypeScript'],
    status: 'published' as const,
    applicantsCount: 5,
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'バックエンドエンジニア',
    description: 'Go言語でのマイクロサービス開発',
    salary: '600,000 - 900,000円/月',
    location: '東京都千代田区',
    skills: ['Go', 'Docker', 'Kubernetes'],
    status: 'draft' as const,
    applicantsCount: 0,
    createdAt: '2024-01-19'
  }
];

const EditProjectPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    if (id) {
      // 開発用のダミーデータから該当するプロジェクトを検索
      const foundProject = DUMMY_PROJECTS.find(p => p.id === id);
      if (foundProject) {
        setProject(foundProject);
      } else {
        setError('プロジェクトが見つかりません');
      }
      setLoading(false);
    }
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!project) return;
    const { name, value } = e.target;
    setProject(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleAddSkill = () => {
    if (!project || !newSkill) return;
    if (!project.skills.includes(newSkill)) {
      setProject(prev => prev ? {
        ...prev,
        skills: [...prev.skills, newSkill]
      } : null);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!project) return;
    setProject(prev => prev ? {
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    } : null);
  };

  const handleStatusToggle = () => {
    if (!project) return;
    setProject(prev => prev ? {
      ...prev,
      status: prev.status === 'published' ? 'draft' : 'published'
    } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ここでAPIを呼び出してプロジェクトを更新
      // 開発用のモック処理
      console.log('更新されたプロジェクト:', project);
      router.push('/company/projects');
    } catch (err) {
      setError('プロジェクトの更新に失敗しました');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="company" />
        <Sidebar userType="company" />
        <div className="ml-64 p-8">
          <div className="text-center">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="company" />
        <Sidebar userType="company" />
        <div className="ml-64 p-8">
          <div className="text-red-600">{error || 'プロジェクトの読み込みに失敗しました'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="company" />
      <Sidebar userType="company" />
      <main className="ml-64 p-8">
        <h1 className="text-2xl font-semibold mb-8">案件の編集</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md">
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                タイトル
              </label>
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                説明
              </label>
              <textarea
                name="description"
                value={project.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                給与
              </label>
              <input
                type="text"
                name="salary"
                value={project.salary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                placeholder="例: 500,000 - 800,000円/月"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                勤務地
              </label>
              <input
                type="text"
                name="location"
                value={project.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                placeholder="例: 東京都渋谷区"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                必要なスキル
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
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
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-200 rounded-full flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center space-x-3">
                <Switch
                  checked={project.status === 'published'}
                  onChange={handleStatusToggle}
                  className={`${
                    project.status === 'published' ? 'bg-blue-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                />
                <span className="text-sm font-medium text-gray-700">
                  {project.status === 'published' ? '公開中' : '下書き'}
                </span>
              </label>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => router.push('/company/projects')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                更新する
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProjectPage;
