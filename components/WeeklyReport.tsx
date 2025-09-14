
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Goal, GoalStatus } from '../types';

interface WeeklyReportProps {
  goals: Goal[];
}

const WeeklyReport: React.FC<WeeklyReportProps> = ({ goals }) => {
  const processData = () => {
    const today = new Date();
    const weekData: { [key: string]: { name: string, achieved: number, total: number } } = {};
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const dayName = dayLabels[date.getDay()];
      weekData[dateString] = { name: dayName, achieved: 0, total: 0 };
    }

    goals.forEach(goal => {
      if (weekData[goal.date]) {
        weekData[goal.date].total++;
        if (goal.status === GoalStatus.Done) {
          weekData[goal.date].achieved++;
        }
      }
    });

    return Object.values(weekData).map(d => ({
        ...d,
        percentage: d.total > 0 ? (d.achieved / d.total) * 100 : 0
    }));
  };

  const data = processData();

  return (
    <div className="bg-surface p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-bold text-text-primary mb-4">Weekly Achievement Report</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip formatter={(value: number) => `${value.toFixed(0)}%`} />
            <Legend />
            <Bar dataKey="percentage" fill="#6366F1" name="Goals Achieved %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyReport;
