import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type UserType = 'engineer' | 'company' | 'public';

interface HeaderProps {
  userType: UserType;
}

export const Header: FC<HeaderProps> = ({ userType }) => {
  const router = useRouter();

  const getHomeLink = () => {
    switch (userType) {
      case 'engineer':
        return '/engineer/dashboard';
      case 'company':
        return '/company/dashboard';
      default:
        return '/';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/select');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={getHomeLink()} className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
          AI Matching
        </Link>
        <nav>
          <ul className="flex items-center space-x-8">
            {userType === 'public' ? (
              <>
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">
                    求人情報
                  </Link>
                </li>
                <li>
                  <Link href="/company" className="text-gray-600 hover:text-gray-900 transition-colors">
                    会社情報
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/auth/select" 
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    ログイン / 新規登録
                  </Link>
                </li>
              </>
            ) : userType === 'engineer' ? (
              <>
                <li>
                  <Link href="/engineer/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                    ダッシュボード
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">
                    求人情報
                  </Link>
                </li>
                <li>
                  <Link href="/engineer/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                    プロフィール
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900 transition-colors">
                    ログアウト
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/company/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                    ダッシュボード
                  </Link>
                </li>
                <li>
                  <Link href="/company/jobs" className="text-gray-600 hover:text-gray-900 transition-colors">
                    求人管理
                  </Link>
                </li>
                <li>
                  <Link href="/company/profile" className="text-gray-600 hover:text-gray-900 transition-colors">
                    企業情報
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900 transition-colors">
                    ログアウト
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;