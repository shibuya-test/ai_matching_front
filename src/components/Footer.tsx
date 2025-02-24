import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* サービス情報 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Matching</h3>
            <p className="text-sm">
              エンジニアと企業をAIでマッチングする革新的なプラットフォーム
            </p>
          </div>
          
          {/* リンク集 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm hover:text-white">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-white">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 会社情報 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">会社情報</h3>
            <ul className="space-y-2 text-sm">
              <li>株式会社Example</li>
              <li>〒000-0000</li>
              <li>東京都渋谷区...</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          © {new Date().getFullYear()} AI Matching. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;