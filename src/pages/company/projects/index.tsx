import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { ProjectCard } from '@/components/ProjectCard';
import { Project } from '@/types';

// 開発用のダミーデータ
const DUMMY_PROJECTS = [
  {
    id: '1',
    title: 'フルスタックエンジニア',
    description: 'React、Node.js、TypeScriptの経験者募集',
    salary: '500,000 - 800,000円/月',
    location: '東京都渋谷区',
    skills: ['React', 'Node.js', 'TypeScript'],
    status: 'published',
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
    status: 'draft',
    applicantsCount: 0,
    createdAt: '2024-01-19'
  }
];

const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    const fetchProjects = async () => {
      try {
        // 開発用のダミーデータを使用
        setProjects(DUMMY_PROJECTS);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '案件の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [router]);

  const handleStatusToggle = async (projectId: string) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId
          ? { ...project, status: project.status === 'published' ? 'draft' : 'published' }
          : project
      )
    );
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header userType="company" />
        <Sidebar userType="company" />
        <div className="ml-64 p-8">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="company" />
      <Sidebar userType="company" />
      <main className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">募集中の案件</h1>
          <Link
            href="/company/projects/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            新規案件登録
          </Link>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onStatusToggle={() => handleStatusToggle(project.id)}
              onEdit={() => router.push(`/company/projects/${project.id}/edit`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
