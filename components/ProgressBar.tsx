import React from 'react';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-primary">Daily Progress</span>
        <span className="text-sm font-medium text-primary">{`${Math.round(clampedValue)}%`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all ease-out duration-1000"
          style={{ width: `${clampedValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;