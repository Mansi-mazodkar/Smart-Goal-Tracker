import React, { useState, useEffect, useCallback } from 'react';
import { Goal, GoalStatus, UserStats, Badge, AIReflection } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import GoalDashboard from './components/GoalDashboard';
import AddGoalForm from './components/AddGoalForm';
import ProgressBar from './components/ProgressBar';
import GamificationWidget from './components/GamificationWidget';
import WeeklyReport from './components/WeeklyReport';
import ReflectionModal from './components/ReflectionModal';
import ChatAssistant from './components/ChatAssistant';
import { getAIReflection } from './services/geminiService';

const App: React.FC = () => {
  const [allGoals, setAllGoals] = useLocalStorage<Goal[]>('goals', []);
  const [stats, setStats] = useLocalStorage<UserStats>('user_stats', { streak: 0, badges: [], lastCompletedDate: null });
  const [lastReflectionDate, setLastReflectionDate] = useLocalStorage<string | null>('last_reflection_date', null);
  
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false);
  const [isReflectionModalOpen, setIsReflectionModalOpen] = useState(false);
  const [reflection, setReflection] = useState<AIReflection | null>(null);
  const [isReflectionLoading, setIsReflectionLoading] = useState(false);
  const [showReflectionReminder, setShowReflectionReminder] = useState(false);

  const todayString = new Date().toISOString().split('T')[0];
  const todaysGoals = allGoals.filter(goal => goal.date === todayString);

  const calculateProgress = useCallback(() => {
    if (todaysGoals.length === 0) return 0;
    const doneCount = todaysGoals.filter(g => g.status === GoalStatus.Done).length;
    return (doneCount / todaysGoals.length) * 100;
  }, [todaysGoals]);

  const updateStats = useCallback(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const goalsToday = allGoals.filter(g => g.date === todayStr);
    const anyDoneToday = goalsToday.some(g => g.status === GoalStatus.Done);
    
    let newStreak = stats.streak;
    if (anyDoneToday && stats.lastCompletedDate !== todayStr) {
      if (stats.lastCompletedDate === yesterdayStr) {
        newStreak++;
      } else {
        newStreak = 1;
      }
    }
    
    const newBadges = new Set(stats.badges);
    if(newStreak >= 3 && !newBadges.has(Badge.StreakStarter)) newBadges.add(Badge.StreakStarter);
    if(calculateProgress() === 100 && goalsToday.length > 0) newBadges.add(Badge.PerfectDay);
    if(allGoals.filter(g => g.status === GoalStatus.Done).length >= 10) newBadges.add(Badge.GoalGetter);
    if(goalsToday.filter(g => g.status === GoalStatus.Done).length >= 5) newBadges.add(Badge.HighAchiever);
    
    // Weekly Warrior check
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split('T')[0];
    });
    const weekGoals = allGoals.filter(g => last7Days.includes(g.date));
    if (weekGoals.length > 0) {
        const weekDoneCount = weekGoals.filter(g => g.status === GoalStatus.Done).length;
        if ((weekDoneCount / weekGoals.length) * 100 >= 70) {
            newBadges.add(Badge.WeeklyWarrior);
        }
    }
    
    setStats({ streak: newStreak, lastCompletedDate: anyDoneToday ? todayStr : stats.lastCompletedDate, badges: Array.from(newBadges) });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allGoals, stats.streak, stats.lastCompletedDate, stats.badges, setStats, calculateProgress]);


  useEffect(() => {
    updateStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allGoals]);
  
  useEffect(() => {
    const checkTimeForReminder = () => {
      const now = new Date();
      const hasIncompleteGoals = todaysGoals.some(g => g.status === GoalStatus.NotDone);
      if (now.getHours() >= 20 && lastReflectionDate !== todayString && hasIncompleteGoals) {
        setShowReflectionReminder(true);
      }
    };

    const intervalId = setInterval(checkTimeForReminder, 60 * 1000); // Check every minute
    checkTimeForReminder(); // Initial check

    return () => clearInterval(intervalId);
  }, [lastReflectionDate, todayString, todaysGoals]);

  const handleAddGoal = (goal: Goal) => {
    setAllGoals(prev => [...prev, goal]);
  };

  const handleStatusChange = (id: string, status: GoalStatus) => {
    setAllGoals(prev => prev.map(g => (g.id === id ? { ...g, status } : g)));
  };

  const handleDelete = (id: string) => {
    setAllGoals(prev => prev.filter(g => g.id !== id));
  };
  
  const handleStartReflection = async (goalsWithReasons: Goal[]) => {
    setIsReflectionLoading(true);
    try {
        const reflectionData = await getAIReflection(goalsWithReasons);
        setReflection(reflectionData);
    } catch (error) {
        console.error(error);
        alert((error as Error).message);
    } finally {
        setIsReflectionLoading(false);
    }
  };
  
  const openReflectionModal = () => {
      setReflection(null);
      setIsReflectionLoading(false);
      setIsReflectionModalOpen(true);
      setShowReflectionReminder(false);
  }
  
  const handleCloseReflectionModal = () => {
      if(reflection){ // only mark as reflected if they got AI feedback
          setLastReflectionDate(todayString);
      }
      setIsReflectionModalOpen(false);
  }

  const incompleteGoals = todaysGoals.filter(g => g.status === GoalStatus.NotDone);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GoalDashboard
              goals={todaysGoals}
              onAddGoalClick={() => setIsAddGoalModalOpen(true)}
              onReflectClick={openReflectionModal}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          </div>
          <div className="space-y-6">
            <div className="bg-surface p-6 rounded-lg shadow-md animate-fade-in">
              <ProgressBar value={calculateProgress()} />
            </div>
            <GamificationWidget stats={stats} />
          </div>
        </div>
        <WeeklyReport goals={allGoals} />
      </main>

      {isAddGoalModalOpen && (
        <AddGoalForm
          onAddGoal={handleAddGoal}
          onClose={() => setIsAddGoalModalOpen(false)}
        />
      )}
      
      {isReflectionModalOpen && (
        <ReflectionModal
          isOpen={isReflectionModalOpen}
          onClose={handleCloseReflectionModal}
          incompleteGoals={incompleteGoals}
          reflection={reflection}
          isLoading={isReflectionLoading}
          onStartReflection={handleStartReflection}
        />
      )}

      {showReflectionReminder && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-secondary text-white p-4 rounded-lg shadow-lg flex items-center space-x-4 z-50 animate-slide-up w-11/12 max-w-lg justify-between">
          <p>🔔 It's after 8 PM! Time for your daily reflection.</p>
          <div className='flex items-center gap-2'>
            <button onClick={openReflectionModal} className="bg-white text-secondary font-bold py-1 px-3 rounded-md hover:bg-gray-200">Reflect</button>
            <button onClick={() => setShowReflectionReminder(false)} className="font-bold text-white/80 hover:text-white">&times;</button>
          </div>
        </div>
      )}

      <ChatAssistant />
    </div>
  );
};

export default App;