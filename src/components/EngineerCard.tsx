import React from 'react';
import { Engineer } from '@/types';
import { CalendarIcon } from '@heroicons/react/24/solid';

interface EngineerCardProps {
  engineer: Engineer;
  onClick: () => void;
}

export const EngineerCard: React.FC<EngineerCardProps> = ({ engineer, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{engineer.name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>稼働可能: {engineer.availableFrom}</span>
          </div>
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          マッチ度 {engineer.matchScore}%
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">スキル</h4>
        <div className="flex flex-wrap gap-2">
          {engineer.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};