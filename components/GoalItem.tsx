import React from 'react';
import { Goal, GoalStatus } from '../types';
import { ICONS, CATEGORY_COLORS } from '../constants';

interface GoalItemProps {
  goal: Goal;
  onStatusChange: (id: string, status: GoalStatus) => void;
  onDelete: (id: string) => void;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal, onStatusChange, onDelete }) => {
  const statusConfig = {
    [GoalStatus.Done]: {
      style: 'border-l-4 border-green-500 bg-green-50',
      actions: [],
    },
    [GoalStatus.NotDone]: {
      style: 'border-l-4 border-red-500 bg-red-50',
      actions: [GoalStatus.InProgress, GoalStatus.Done],
    },
    [GoalStatus.InProgress]: {
      style: 'border-l-4 border-yellow-500 bg-yellow-50',
      actions: [GoalStatus.Done, GoalStatus.NotDone],
    },
  };

  return (
    <div className={`bg-surface p-4 rounded-lg shadow-md flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${statusConfig[goal.status].style}`}>
      <div>
        <div className="flex justify-between items-start">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[goal.category]}`}>
            {ICONS[goal.category]}
            {goal.category}
          </span>
          <button onClick={() => onDelete(goal.id)} className="text-gray-400 hover:text-red-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          </button>
        </div>
        <h4 className="text-lg font-bold text-text-primary mt-2">{goal.title}</h4>
        <p className="text-sm text-text-secondary mt-1">
          {goal.startTime} - {goal.endTime}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-end space-x-2">
        {statusConfig[goal.status].actions.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(goal.id, status)}
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              status === GoalStatus.Done ? 'bg-green-200 text-green-800 hover:bg-green-300'
              : status === GoalStatus.NotDone ? 'bg-red-200 text-red-800 hover:bg-red-300'
              : 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300'
            }`}
          >
            {status}
          </button>
        ))}
        <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full">{goal.status}</span>
      </div>
    </div>
  );
};

export default GoalItem;