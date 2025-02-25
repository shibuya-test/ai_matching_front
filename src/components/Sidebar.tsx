import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  HomeIcon, 
  BriefcaseIcon, 
  ChatBubbleLeftRightIcon, 
  BellIcon,
  UserIcon 
} from '@heroicons/react/24/outline';

interface SidebarProps {
  userType: 'engineer' | 'company';
}

const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const engineerLinks = [
    { 
      href: '/engineer/dashboard', 
      icon: HomeIcon, 
      text: 'ダッシュボード',
      badge: 0 
    },
    { 
      href: '/jobs', 
      icon: BriefcaseIcon, 
      text: '求人情報',
      badge: 0 
    },
    { 
      href: '/engineer/messages', 
      icon: ChatBubbleLeftRightIcon, 
      text: 'メッセージ',
      badge: 2 
    },
    { 
      href: '/engineer/notifications', 
      icon: BellIcon, 
      text: 'お知らせ',
      badge: 1 
    },
    { 
      href: '/engineer/profile', 
      icon: UserIcon, 
      text: 'プロフィール',
      badge: 0 
    }
  ];

  const links = userType === 'engineer' ? engineerLinks : [];

  return (
    <div className="w-64 bg-white h-screen shadow-lg fixed left-0 top-16">
      <nav className="mt-5">
        <div className="px-4">
          {links.map((link) => {
            const isActive = currentPath === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="flex-1">{link.text}</span>
                {link.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;