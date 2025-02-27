import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Project } from '@/types';

const NewProjectPage: React.FC = () => {
  const router = useRouter();
  const [newSkill, setNewSkill] = useState('');
  const [project, setProject] = useState<Omit<Project, 'id' | 'createdAt' | 'applicantsCount'>>({
    title: '',
    description: '',
    salary: '',
    location: '',
    skills: [],
    status: 'draft' as const
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill && !project.skills.includes(newSkill)) {
      setProject(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProject(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ここでAPIを呼び出して新規案件を登録
      // 開発用のモック処理
      const newProject: Project = {
        ...project,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        applicantsCount: 0
      };
      console.log('新規案件:', newProject);
      router.push('/company/projects');
    } catch (error) {
      console.error('案件の登録に失敗しました:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="company" />
      <Sidebar userType="company" />
      <main className="ml-64 p-8">
        <h1 className="text-2xl font-semibold mb-8">新規案件登録</h1>
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

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                登録
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewProjectPage;
