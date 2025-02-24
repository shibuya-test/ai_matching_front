import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

const SelectAuthPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType="public" />

      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ログイン / 新規登録
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            AI Matchingで最適な案件・人材と出会いましょう
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* エンジニア向けセクション */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                エンジニアの方
              </h3>
              <div className="space-y-3">
                <Link
                  href="/engineer/login"
                  className="w-full flex justify-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md shadow-sm text-sm font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  ログイン
                </Link>
                <Link
                  href="/engineer/register"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-white bg-blue-600 rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  新規登録
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">または</span>
              </div>
            </div>

            {/* 企業向けセクション */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                企業の方
              </h3>
              <div className="space-y-3">
                <Link
                  href="/company/login"
                  className="w-full flex justify-center py-2 px-4 border border-green-600 text-green-600 rounded-md shadow-sm text-sm font-medium hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  ログイン
                </Link>
                <Link
                  href="/company/register"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-white bg-green-600 rounded-md shadow-sm text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  新規登録
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectAuthPage;
