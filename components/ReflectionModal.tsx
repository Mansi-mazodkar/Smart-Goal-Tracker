
import React from 'react';
import { AIReflection, Goal } from '../types';
import { INCOMPLETE_REASONS } from '../constants';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  incompleteGoals: Goal[];
  reflection: AIReflection | null;
  isLoading: boolean;
  onStartReflection: (goalsWithReasons: Goal[]) => void;
}

const ReflectionModal: React.FC<ReflectionModalProps> = ({
  isOpen,
  onClose,
  incompleteGoals,
  reflection,
  isLoading,
  onStartReflection,
}) => {
  const [reasons, setReasons] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    if (isOpen) {
      const initialReasons = incompleteGoals.reduce((acc, goal) => {
        acc[goal.id] = '';
        return acc;
      }, {} as { [key: string]: string });
      setReasons(initialReasons);
    }
  }, [isOpen, incompleteGoals]);

  const handleReasonChange = (goalId: string, reason: string) => {
    setReasons(prev => ({ ...prev, [goalId]: reason }));
  };
  
  const handleSubmit = () => {
      const goalsWithReasons = incompleteGoals.map(g => ({...g, reason: reasons[g.id]}))
      onStartReflection(goalsWithReasons);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-surface rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text-primary">End of Day Reflection</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>

        {isLoading ? (
          <div className="text-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-text-secondary">Your AI coach is preparing your feedback...</p>
          </div>
        ) : reflection ? (
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">💡 Motivational Tip</h3>
            <p className="bg-indigo-50 p-4 rounded-md text-indigo-800 mb-6">{reflection.motivationalTip}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">📺 Recommended Videos</h3>
                <ul className="space-y-2">
                  {reflection.youtubeLinks.map((link, i) => (
                    <li key={i} className="bg-gray-100 p-3 rounded-md hover:bg-gray-200">
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2">📚 Suggested Articles</h3>
                <ul className="space-y-2">
                  {reflection.articleLinks.map((link, i) => (
                    <li key={i} className="bg-gray-100 p-3 rounded-md hover:bg-gray-200">
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
             <button
                onClick={onClose}
                className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Done
              </button>
          </div>
        ) : (
          <div>
            <p className="text-text-secondary mb-4">Let's reflect on the goals you couldn't complete. Why do you think that was?</p>
            <div className="space-y-4">
              {incompleteGoals.map(goal => (
                <div key={goal.id} className="bg-gray-50 p-4 rounded-md">
                  <p className="font-semibold text-text-primary">{goal.title}</p>
                  <div className="mt-2">
                    <select
                      value={reasons[goal.id] || ''}
                      onChange={(e) => handleReasonChange(goal.id, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="" disabled>Select a reason</option>
                      {INCOMPLETE_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={Object.values(reasons).some(r => r === '')}
              className="mt-6 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-focus disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Get AI Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReflectionModal;
