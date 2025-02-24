import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TopPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userType="public" />
      
      {/* メインコンテンツ */}
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            エンジニアと企業をつなぐ
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AIを活用したマッチングで、最適な出会いを実現します
          </p>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-20">
          <Link 
            href="/engineer/register"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 min-w-[280px] shadow-sm hover:shadow-md"
          >
            エンジニアとして登録する
          </Link>
          <Link 
            href="/company/register"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white border-2 border-green-600 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 min-w-[280px] shadow-sm hover:shadow-md"
          >
            企業として登録する
          </Link>
        </div>

        {/* サービス紹介セクション */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              AIマッチング
            </h3>
            <p className="text-gray-600">
              AIが経験やスキルを分析し、最適な案件・人材をマッチングします。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              効率的な採用
            </h3>
            <p className="text-gray-600">
              従来の採用プロセスを効率化し、優秀な人材との出会いを促進します。
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              スキル分析
            </h3>
            <p className="text-gray-600">
              AIがスキルセットを分析し、市場価値の高いスキルを提案します。
            </p>
          </div>
        </div>

        {/* 特徴セクション */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            選ばれる理由
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl mb-4 text-blue-600">
                <span role="img" aria-label="ai">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI技術</h3>
              <p className="text-gray-600">最新のAI技術で精度の高いマッチングを実現</p>
            </div>
            <div>
              <div className="text-4xl mb-4 text-blue-600">
                <span role="img" aria-label="speed">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">スピード</h3>
              <p className="text-gray-600">素早いマッチングとレスポンス</p>
            </div>
            <div>
              <div className="text-4xl mb-4 text-blue-600">
                <span role="img" aria-label="security">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">セキュリティ</h3>
              <p className="text-gray-600">安全なデータ管理と個人情報保護</p>
            </div>
            <div>
              <div className="text-4xl mb-4 text-blue-600">
                <span role="img" aria-label="support">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">サポート</h3>
              <p className="text-gray-600">24時間365日のカスタマーサポート</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TopPage;