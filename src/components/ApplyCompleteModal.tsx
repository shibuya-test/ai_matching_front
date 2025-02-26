import React from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ApplyCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyCompleteModal: React.FC<ApplyCompleteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <CheckCircleIcon className="w-8 h-8 text-green-500 mr-2" />
            <h2 className="text-2xl font-bold">応募完了</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            応募が完了しました。企業からの連絡をお待ちください。
          </p>
          <p className="text-gray-600">
            応募状況は「マイページ」から確認できます。
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyCompleteModal;
