import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const { type } = router.query; // 'engineer' または 'company'
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // APIエンドポイントが実装されたら有効化
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ email, userType: type })
      // });

      // if (!response.ok) throw new Error('パスワードリセットリクエストに失敗しました');

      // 開発用の仮実装
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({
        type: 'success',
        text: 'パスワードリセット用のメールを送信しました。メールをご確認ください。'
      });
      setEmail('');
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'エラーが発生しました。しばらく経ってから再度お試しください。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEngineer = type === 'engineer';
  const themeColor = isEngineer ? 'blue' : 'green';
  const loginPath = isEngineer ? '/engineer/login' : '/company/login';

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="public" />

      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            パスワードをお忘れの方
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            登録時のメールアドレスを入力してください
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {message && (
              <div className={`mb-4 p-4 rounded ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  メールアドレス
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-${themeColor}-500 focus:border-${themeColor}-500 sm:text-sm`}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-${themeColor}-600 hover:bg-${themeColor}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? '送信中...' : 'パスワードリセットメールを送信'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    または
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={loginPath}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-${themeColor}-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500`}
                >
                  ログインページに戻る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
