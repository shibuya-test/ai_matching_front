import React from 'react';
import Link from 'next/link';
import {
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  StarIcon,
  ChatBubbleLeftIcon,
  BuildingOfficeIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

type SidebarProps = {
  userType: 'company' | 'engineer';
};

const CompanyMenuItems = [
  {
    label: 'ダッシュボード',
    href: '/company/dashboard',
    icon: HomeIcon,
  },
  {
    label: '案件管理',
    href: '/company/projects',
    icon: BriefcaseIcon,
  },
  {
    label: '応募者管理',
    href: '/company/applications',
    icon: UsersIcon,
  },
  {
    label: 'おすすめエンジニア',
    href: '/company/matching',
    icon: StarIcon,
  },
  {
    label: '評価一覧',
    href: '/company/my-ratings',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    label: 'メッセージ',
    href: '/company/messages',
    icon: ChatBubbleLeftIcon,
  },
  {
    label: '企業プロフィール',
    href: '/company/profile',
    icon: BuildingOfficeIcon,
  },
];

const EngineerMenuItems = [
  {
    label: 'ダッシュボード',
    href: '/engineer/dashboard',
    icon: HomeIcon,
  },
  {
    label: '案件検索',
    href: '/engineer/jobs',
    icon: BriefcaseIcon,
  },
  {
    label: '評価一覧',
    href: '/engineer/my-ratings',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    label: 'AIチャット',
    href: '/engineer/ai-chat',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    label: 'メッセージ',
    href: '/engineer/messages',
    icon: ChatBubbleLeftIcon,
  },
  {
    label: 'プロフィール',
    href: '/engineer/profile',
    icon: BuildingOfficeIcon,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  const menuItems = userType === 'company' ? CompanyMenuItems : EngineerMenuItems;

  return (
    <div className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;