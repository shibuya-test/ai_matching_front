import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  BuildingOfficeIcon,
  StarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  userType: 'engineer' | 'company';
}

const engineerMenuItems = [
  {
    path: '/engineer/dashboard',
    label: 'ダッシュボード',
    icon: HomeIcon,
  },
  {
    path: '/engineer/projects',
    label: '案件一覧',
    icon: BriefcaseIcon,
  },
  {
    path: '/engineer/messages',
    label: 'メッセージ',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    path: '/engineer/my-ratings',
    label: '過去案件の評価',
    icon: StarIcon,
  },
  {
    path: '/engineer/profile',
    label: 'プロフィール',
    icon: UserCircleIcon,
  },
];

const companyMenuItems = [
  {
    path: '/company/dashboard',
    label: 'ダッシュボード',
    icon: HomeIcon,
  },
  {
    path: '/company/projects',
    label: '案件管理',
    icon: DocumentTextIcon,
  },
  {
    path: '/company/messages',
    label: 'メッセージ',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    path: '/company/profile',
    label: '企業プロフィール',
    icon: BuildingOfficeIcon,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  const router = useRouter();
  const menuItems = userType === 'engineer' ? engineerMenuItems : companyMenuItems;

  return (
    <div className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-6 h-6 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;