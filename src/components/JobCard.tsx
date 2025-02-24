import React from 'react';
import { Job } from '@/types';

export function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <img 
          src={job.company.logo} 
          className="w-12 h-12 rounded-full object-cover"
          alt={job.company.name}
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600">{job.company.name}</p>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <p className="text-gray-700 line-clamp-2">{job.description}</p>
        
        <div className="flex items-center text-gray-700">
          <span className="font-medium">¥{job.rate.min.toLocaleString()} - ¥{job.rate.max.toLocaleString()}</span>
          <span className="ml-1 text-sm">/時</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <span className="text-sm">{job.location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {job.skills.map(skill => (
            <span key={skill} className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 