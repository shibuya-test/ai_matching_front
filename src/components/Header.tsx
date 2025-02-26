import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeaderProps {
  userType: 'engineer' | 'company' | 'public';
}

const getHomeLink = (userType: string) => {
  switch (userType) {
    case 'engineer':
      return '/engineer/dashboard';
    case 'company':
      return '/company/dashboard';
    default:
      return '/';
  }
};

const Header: React.FC<HeaderProps> = ({ userType }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/select');
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href={getHomeLink(userType)} className="text-xl font-bold">
            AI Matching
          </Link>

          <nav className="flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ホーム
            </Link>
            {(userType === 'public' || userType === 'company') && (
              <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
                求人情報
              </Link>
            )}
            <Link href="/company" className="text-gray-600 hover:text-gray-900">
              会社情報
            </Link>

            {userType === 'public' && (
              <Link 
                href="/auth/select"
                className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 rounded-full text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm font-medium"
              >
                ログイン / 新規登録
              </Link>
            )}

            {userType === 'engineer' && (
              <>
                <Link 
                  href="/engineer/dashboard" 
                  className={`text-gray-600 hover:text-gray-900 ${
                    router.pathname === '/engineer/dashboard' ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  ダッシュボード
                </Link>
                <Link 
                  href="/engineer/jobs" 
                  className={`text-gray-600 hover:text-gray-900 ${
                    router.pathname === '/engineer/jobs' ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  求人情報
                </Link>
                <Link 
                  href="/engineer/ai-chat" 
                  className={`text-gray-600 hover:text-gray-900 ${
                    router.pathname === '/engineer/ai-chat' ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  AIチャット
                </Link>
                <Link 
                  href="/engineer/profile" 
                  className={`text-gray-600 hover:text-gray-900 ${
                    router.pathname === '/engineer/profile' ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  プロフィール
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ログアウト
                </button>
              </>
            )}

            {userType === 'company' && (
              <>
                <Link 
                  href="/company/dashboard" 
                  className={`text-gray-600 hover:text-gray-900 ${
                    router.pathname === '/company/dashboard' ? 'text-green-600 font-semibold' : ''
                  }`}
                >
                  ダッシュボード
                </Link>
                <Link 
                  href="/company/jobs" 
                  className={`text-gray-600 hover:text-gray-900 ${
                    router.pathname === '/company/jobs' ? 'text-green-600 font-semibold' : ''
                  }`}
                >
                  求人管理
                </Link>
                <Link 
                  href="/company/profile" 
                  className={`text-gray-600 hover:text-gray-900 ${
                    router.pathname === '/company/profile' ? 'text-green-600 font-semibold' : ''
                  }`}
                >
                  企業情報
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ログアウト
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;