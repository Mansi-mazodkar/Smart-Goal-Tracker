
import React, { useState } from 'react';
import { Goal, GoalCategory, GoalStatus } from '../types';
import { GOAL_CATEGORIES } from '../constants';

interface AddGoalFormProps {
  onAddGoal: (goal: Goal) => void;
  onClose: () => void;
}

const AddGoalForm: React.FC<AddGoalFormProps> = ({ onAddGoal, onClose }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GoalCategory>(GoalCategory.Learning);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newGoal: Goal = {
      id: new Date().toISOString(),
      title,
      category,
      startTime,
      endTime,
      status: GoalStatus.InProgress,
      date: new Date().toISOString().split('T')[0],
    };

    onAddGoal(newGoal);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-surface p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Add a New Goal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-secondary">Goal Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="e.g., Complete React tutorial"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-text-secondary">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as GoalCategory)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              {GOAL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="startTime" className="block text-sm font-medium text-text-secondary">Start Time</label>
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endTime" className="block text-sm font-medium text-text-secondary">End Time</label>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-text-secondary rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-focus">
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalForm;
