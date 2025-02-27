import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

// メッセージの型定義
type Message = {
  id: string;
  engineerId: string;
  engineerName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
};

// 開発用のダミーデータ
const DUMMY_MESSAGES: Message[] = [
  {
    id: '1',
    engineerId: 'eng1',
    engineerName: '山田太郎',
    lastMessage: '面接の日程調整について',
    timestamp: '2024-02-01T10:00:00',
    unread: true,
  },
  {
    id: '2',
    engineerId: 'eng2',
    engineerName: '鈴木一郎',
    lastMessage: 'ご検討ありがとうございます',
    timestamp: '2024-02-02T15:30:00',
    unread: false,
  },
];

const MessagesPage: React.FC = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/select');
      return;
    }

    const fetchMessages = async () => {
      try {
        // 開発用のダミーデータを使用
        setMessages(DUMMY_MESSAGES);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'メッセージの取得に失敗しました');
        setLoading(false);
      }
    };

    fetchMessages();
  }, [router]);

  const handleMessageClick = (engineerId: string) => {
    router.push(`/company/messages/${engineerId}`);
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
        <h1 className="text-2xl font-semibold mb-8">メッセージ</h1>
        
        <div className="bg-white shadow-md rounded-lg">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message.engineerId)}
              className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {message.engineerName}
                    {message.unread && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        新着
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{message.lastMessage}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;