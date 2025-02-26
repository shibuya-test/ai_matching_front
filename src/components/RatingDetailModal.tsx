import React from 'react';
import { Dialog } from '@headlessui/react';
import { Rating } from '@/types';
import { StarIcon, CalendarIcon, BuildingOfficeIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface RatingDetailModalProps {
  rating: Rating;
  isOpen: boolean;
  onClose: () => void;
}

export const RatingDetailModal: React.FC<RatingDetailModalProps> = ({ rating, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
          <div className="relative p-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <Dialog.Title className="text-2xl font-semibold mb-4">
              {rating.projectName}
            </Dialog.Title>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                  <span className="text-lg">{rating.companyName}</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="w-6 h-6 text-yellow-400 mr-1" />
                  <span className="text-xl font-bold">{rating.score}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">プロジェクト期間</h3>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <span>{rating.duration}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">評価コメント</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {rating.comment}
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">使用技術</h3>
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

              <div className="text-right text-sm text-gray-500">
                評価日: {rating.evaluatedAt}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};