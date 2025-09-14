
import React from 'react';
import { GoalCategory } from './types';

export const GOAL_CATEGORIES: GoalCategory[] = [
  GoalCategory.Learning,
  GoalCategory.Exercise,
  GoalCategory.TeamWork,
  GoalCategory.PersonalGrowth,
];

export const INCOMPLETE_REASONS = ["Time", "Difficulty", "Distraction", "Other"];

export const ICONS: { [key: string]: JSX.Element } = {
  [GoalCategory.Learning]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3.5a1 1 0 00.028 1.838l7 3.5a1 1 0 00.732 0l7-3.5a1 1 0 00.028-1.838l-7-3.5zM3 9.333V14a1 1 0 001 1h12a1 1 0 001-1V9.333l-7 3.5-7-3.5z" />
    </svg>
  ),
  [GoalCategory.Exercise]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  ),
  [GoalCategory.TeamWork]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  ),
  [GoalCategory.PersonalGrowth]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
  ),
};

export const CATEGORY_COLORS: { [key in GoalCategory]: string } = {
  [GoalCategory.Learning]: "bg-indigo-100 text-indigo-800",
  [GoalCategory.Exercise]: "bg-green-100 text-green-800",
  [GoalCategory.TeamWork]: "bg-yellow-100 text-yellow-800",
  [GoalCategory.PersonalGrowth]: "bg-purple-100 text-purple-800",
};
