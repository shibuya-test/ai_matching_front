import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Application } from '@/types';

// 選考ステータスの定義
type Status = 'pending' | 'document_screening' | 'interview_scheduling' | 'accepted' | 'rejected';

// ステータスの日本語表示
const STATUS_LABELS: Record<Status, string> = {
  pending: '選考待ち',
  document_screening: '書類選考中',
  interview_scheduling: '面接調整中',
  accepted: '合格',
  rejected: '不合格'
};

// 開発用のダミーデータ
const DUMMY_APPLICATIONS: Application[] = [
  {
    id: '1',
    engineerId: 'eng1',
    engineerName: '山田太郎',
    projectId: '1',
    projectTitle: 'フルスタックエンジニア',
    appliedAt: '2024-02-01',
    status: 'pending',
    note: '',
    resume: 'https://example.com/resume1.pdf'
  },
  {
    id: '2',
    engineerId: 'eng2',
    engineerName: '鈴木一郎',
    projectId: '1',
    projectTitle: 'フルスタックエンジニア',
    appliedAt: '2024-02-02',
    status: 'document_screening',
    note: '経験が豊富、要面談',
    resume: 'https://example.com/resume2.pdf'
  }
];

const ApplicationsPage: React.FC = () => {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    const fetchApplications = async () => {
      try {
        setApplications(DUMMY_APPLICATIONS);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : '応募情報の取得に失敗しました');
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  const handleStatusChange = (applicationId: string, newStatus: Status) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? { ...app, status: newStatus }
          : app
      )
    );
  };

  const handleNoteChange = (applicationId: string, note: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === applicationId
          ? { ...app, note }
          : app
      )
    );
  };

  const handleViewEngineerProfile = (engineerId: string) => {
    router.push(`/company/engineers/${engineerId}`);
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
        <h1 className="text-2xl font-semibold mb-8">応募者管理</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  応募者名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  応募案件
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  応募日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  選考メモ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewEngineerProfile(application.engineerId)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      {application.engineerName}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.projectTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={application.status}
                      onChange={(e) => handleStatusChange(application.id, e.target.value as Status)}
                      className="text-sm rounded-md border-gray-300"
                    >
                      {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <textarea
                      value={application.note}
                      onChange={(e) => handleNoteChange(application.id, e.target.value)}
                      className="text-sm rounded-md border-gray-300 w-full"
                      rows={2}
                      placeholder="選考メモを入力"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ApplicationsPage;