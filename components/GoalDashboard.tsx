import React from 'react';
import { Goal, GoalStatus } from '../types';
import GoalItem from './GoalItem';

interface GoalDashboardProps {
  goals: Goal[];
  onAddGoalClick: () => void;
  onReflectClick: () => void;
  onStatusChange: (id: string, status: GoalStatus) => void;
  onDelete: (id: string) => void;
}

const GoalDashboard: React.FC<GoalDashboardProps> = ({
  goals,
  onAddGoalClick,
  onReflectClick,
  onStatusChange,
  onDelete
}) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const goalsExist = goals.length > 0;
  const anyNotDone = goals.some(g => g.status === GoalStatus.NotDone);

  return (
    <div className="bg-surface p-6 rounded-lg shadow-md animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Today's Goals</h2>
          <p className="text-text-secondary">{today}</p>
        </div>
        <div className="flex space-x-2">
           <button
            onClick={onReflectClick}
            disabled={!anyNotDone}
            title={!anyNotDone ? "Mark at least one goal as 'Not Done' to reflect" : "Reflect on your day"}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.258 5.244a.5.5 0 00.258.655A10.046 10.046 0 0010 15c2.31 0 4.438-.78 6-2.101a.5.5 0 00.258-.655C15.454 11.665 15 9.887 15 8a6 6 0 00-5-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
            Reflect
          </button>
          <button
            onClick={onAddGoalClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            Add Goal
          </button>
        </div>
      </div>

      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map(goal => (
            <GoalItem key={goal.id} goal={goal} onStatusChange={onStatusChange} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-text-primary">No goals for today yet.</h3>
          <p className="mt-1 text-text-secondary">Ready to make an impact? Add your first goal!</p>
          <button
            onClick={onAddGoalClick}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            + Add Goal
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalDashboard;