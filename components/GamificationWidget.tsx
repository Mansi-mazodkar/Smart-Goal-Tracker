import React from 'react';
import { UserStats, Badge } from '../types';

interface GamificationWidgetProps {
  stats: UserStats;
}

const badgeInfo: { [key in Badge]: { emoji: string; title: string } } = {
  [Badge.WeeklyWarrior]: { emoji: '🏆', title: 'Weekly Warrior: Achieved >70% of goals this week' },
  [Badge.PerfectDay]: { emoji: '🌟', title: 'Perfect Day: Completed all goals for a day' },
  [Badge.StreakStarter]: { emoji: '🚀', title: 'Streak Starter: Maintained a 3+ day streak' },
  [Badge.GoalGetter]: { emoji: '🏅', title: 'Goal Getter: Completed 10+ goals overall' },
  [Badge.HighAchiever]: { emoji: '🎯', title: 'High Achiever: Completed 5+ goals in a day' },
};

const GamificationWidget: React.FC<GamificationWidgetProps> = ({ stats }) => {
  return (
    <div className="bg-surface p-6 rounded-lg shadow-md animate-fade-in">
      <h3 className="text-xl font-bold text-text-primary mb-4">Achievements</h3>
      <div className="flex items-center space-x-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-yellow-500 transition-transform transform hover:scale-110">🔥</div>
          <div className="text-2xl font-bold text-text-primary">{stats.streak}</div>
          <p className="text-text-secondary">Day Streak</p>
        </div>
        <div>
          <h4 className="font-semibold text-text-primary mb-2">Badges</h4>
          {stats.badges.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {stats.badges.map((badge) => (
                <span key={badge} className="text-3xl transition-transform transform hover:scale-125" title={badgeInfo[badge].title}>
                  {badgeInfo[badge].emoji}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary">No badges earned yet. Keep going!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamificationWidget;