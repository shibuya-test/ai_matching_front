import React from 'react';
import { Project } from '@/types';
import { Switch } from '@headlessui/react';
import { PencilIcon, MapPinIcon, CurrencyYenIcon } from '@heroicons/react/24/outline';

interface ProjectCardProps {
  project: Project;
  onStatusToggle: () => void;
  onEdit: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onStatusToggle,
  onEdit
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <CurrencyYenIcon className="w-5 h-5 mr-2" />
              <span>{project.salary}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="w-5 h-5 mr-2" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Switch
            checked={project.status === 'published'}
            onChange={onStatusToggle}
            className={`${
              project.status === 'published' ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">公開状態を切り替え</span>
            <span
              className={`${
                project.status === 'published' ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <button
            onClick={onEdit}
            className="text-gray-600 hover:text-gray-900"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>応募数: {project.applicantsCount}</div>
        <div>作成日: {new Date(project.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
};
