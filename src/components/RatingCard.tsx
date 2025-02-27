import React from 'react';
import { BuildingOfficeIcon, CalendarIcon, StarIcon } from '@heroicons/react/24/solid';
import { Rating } from '../types';

type RatingCardProps = {
  rating: Rating;
};

export const RatingCard: React.FC<RatingCardProps> = ({ rating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{rating.projectName}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <BuildingOfficeIcon className="w-5 h-5 mr-2" />
            <span>{rating.companyName}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>{rating.duration}</span>
          </div>
        </div>
        <div className="flex items-center">
          <StarIcon className="w-6 h-6 text-yellow-400 mr-1" />
          <span className="text-xl font-bold">{rating.score}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">評価コメント</h4>
        <p className="text-gray-600">{rating.comment}</p>
      </div>

      <div>
        <h4 className="font-medium mb-2">使用技術</h4>
        <div className="flex flex-wrap gap-2">
          {rating.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 text-right text-sm text-gray-500">
        評価日: {rating.evaluatedAt}
      </div>
    </div>
  );
};