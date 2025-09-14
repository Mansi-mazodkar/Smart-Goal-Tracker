import React, { useState } from 'react';
import { getAIChatResponse } from '../services/geminiService';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<{ role: string, parts: { text: string }[] }[]>([]);
  
  const handleToggle = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = { role: 'user', parts: [{ text: query }] };
    const newHistory = [...history, userMessage];
    
    try {
      const response = await getAIChatResponse(query, newHistory);
      const modelMessage = { role: 'model', parts: [{ text: response }] };
      setHistory([...newHistory, modelMessage]);
    } catch (error) {
      const errorMessage = { role: 'model', parts: [{ text: 'Sorry, I am having trouble connecting. Please try again later.' }] };
      setHistory([...newHistory, errorMessage]);
    } finally {
      setQuery('');
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-110"
        aria-label="Open AI Assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-surface rounded-lg shadow-xl border border-gray-200 flex flex-col h-[500px] animate-slide-up">
          <header className="p-4 border-b bg-gray-50 rounded-t-lg">
            <h3 className="font-bold text-text-primary">AI Assistant</h3>
            <p className="text-sm text-text-secondary">Stuck on something? Ask me!</p>
          </header>
          <div className="flex-1 p-4 overflow-y-auto">
            {history.length === 0 && <p className="text-center text-text-secondary">Ask a question to start.</p>}
            {history.map((msg, index) => (
              <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
                 <div className={`chat-bubble ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-text-primary'} p-3 rounded-lg max-w-xs`}>
                    {msg.parts[0].text}
                 </div>
              </div>
            ))}
             {isLoading && <div className="chat chat-start"><div className="chat-bubble bg-gray-200 text-text-primary p-3 rounded-lg">...</div></div>}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., How to learn React faster?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-md hover:bg-primary-focus disabled:bg-gray-400"
                disabled={isLoading}
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;