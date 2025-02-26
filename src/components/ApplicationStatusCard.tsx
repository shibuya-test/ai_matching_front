import React from 'react';

interface ApplicationStatusCardProps {
  title: string;
  count: number;
  colorClass: string;
}

export const ApplicationStatusCard: React.FC<ApplicationStatusCardProps> = ({
  title,
  count,
  colorClass
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-center">
        <span className={`w-3 h-3 rounded-full ${colorClass} mr-2`}></span>
        <span className="text-2xl font-bold">{count}</span>
      </div>
    </div>
  );
};