import React from 'react';
import Link from 'next/link';
import { CurrencyYenIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Job } from '@/types';

type JobCardProps = {
  job: Job;
  matchScore?: number;
};

export const JobCard: React.FC<JobCardProps> = ({ job, matchScore }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {matchScore && (
          <div className="flex items-center justify-end mb-2">
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              マッチ度 {matchScore}%
            </div>
          </div>
        )}
        
        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
        <p className="text-gray-600 mb-4">{job.company}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <CurrencyYenIcon className="w-5 h-5 mr-2" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="w-5 h-5 mr-2" />
            <span>{job.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <Link
          href={`/engineer/jobs/${job.id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
}; 