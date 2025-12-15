import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Award, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressEntry {
  date: string;
  sobrietyDays: number;
  moodRating: number;
  notes: string;
}

interface ProgressTrackerProps {
  userId: string;
}

export function ProgressTracker({ userId }: ProgressTrackerProps) {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [moodRating, setMoodRating] = useState(5);
  const [notes, setNotes] = useState('');
  const [sobrietyStartDate, setSobrietyStartDate] = useState<Date | null>(null);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem(`progress_${userId}`);
    if (stored) {
      const data = JSON.parse(stored);
      setEntries(data.entries || []);
      setSobrietyStartDate(data.sobrietyStartDate ? new Date(data.sobrietyStartDate) : null);
    }
  }, [userId]);

  const saveToStorage = (newEntries: ProgressEntry[], startDate: Date | null) => {
    localStorage.setItem(`progress_${userId}`, JSON.stringify({
      entries: newEntries,
      sobrietyStartDate: startDate
    }));
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    const currentSobrietyDays = sobrietyStartDate 
      ? Math.floor((new Date().getTime() - sobrietyStartDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    const newEntry: ProgressEntry = {
      date: today,
      sobrietyDays: currentSobrietyDays,
      moodRating,
      notes
    };

    const updatedEntries = [...entries.filter(e => e.date !== today), newEntry].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    setEntries(updatedEntries);
    saveToStorage(updatedEntries, sobrietyStartDate);
    setShowAddForm(false);
    setNotes('');
    setMoodRating(5);
  };

  const handleSetSobrietyDate = (date: string) => {
    const startDate = new Date(date);
    setSobrietyStartDate(startDate);
    saveToStorage(entries, startDate);
  };

  const currentSobrietyDays = sobrietyStartDate 
    ? Math.floor((new Date().getTime() - sobrietyStartDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const chartData = entries.slice(-30).map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: entry.moodRating,
    days: entry.sobrietyDays
  }));

  const badges = [
    { days: 1, name: 'First Day', emoji: '🌱', achieved: currentSobrietyDays >= 1 },
    { days: 7, name: 'One Week', emoji: '🌟', achieved: currentSobrietyDays >= 7 },
    { days: 30, name: 'One Month', emoji: '🏆', achieved: currentSobrietyDays >= 30 },
    { days: 90, name: '90 Days', emoji: '💪', achieved: currentSobrietyDays >= 90 },
    { days: 180, name: 'Six Months', emoji: '🎯', achieved: currentSobrietyDays >= 180 },
    { days: 365, name: 'One Year', emoji: '👑', achieved: currentSobrietyDays >= 365 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">Progress Tracker</h2>
        <p className="text-gray-600 mb-6">
          Track your wellness journey anonymously. Your data is stored locally and never shared.
        </p>

        {/* Sobriety Counter */}
        {!sobrietyStartDate ? (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
            <h3 className="text-gray-900 mb-4">Set Your Sobriety Start Date</h3>
            <input
              type="date"
              onChange={(e) => handleSetSobrietyDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        ) : (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8" />
              <h3 className="text-white">Days of Sobriety</h3>
            </div>
            <div className="text-center">
              <div className="text-white mb-2">{currentSobrietyDays}</div>
              <p className="text-indigo-100">
                Since {sobrietyStartDate.toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">Milestones</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {badges.map(badge => (
              <div
                key={badge.days}
                className={`text-center p-4 rounded-lg border-2 transition-all ${
                  badge.achieved
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{badge.emoji}</div>
                <p className="text-gray-900">{badge.name}</p>
                <p className="text-gray-600">{badge.days} days</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Entry Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Log Today's Progress</span>
          </button>
        )}

        {/* Add Entry Form */}
        {showAddForm && (
          <form onSubmit={handleAddEntry} className="bg-gray-50 rounded-lg p-6 space-y-4">
            <h3 className="text-gray-900">Log Today's Progress</h3>
            
            <div>
              <label className="block text-gray-700 mb-2">
                How are you feeling today? (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={moodRating}
                onChange={(e) => setMoodRating(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-gray-600">
                <span>1 (Poor)</span>
                <span className="text-indigo-600">{moodRating}</span>
                <span>10 (Excellent)</span>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="How was your day? Any challenges or victories?"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save Entry
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Progress Chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <h3 className="text-gray-900">Mood Trend (Last 30 Days)</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line type="monotone" dataKey="mood" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Entries */}
      {entries.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-gray-900 mb-4">Recent Entries</h3>
          <div className="space-y-4">
            {entries.slice(-5).reverse().map((entry, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-900">{new Date(entry.date).toLocaleDateString()}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-indigo-600">Day {entry.sobrietyDays}</span>
                    <span className="text-gray-600">Mood: {entry.moodRating}/10</span>
                  </div>
                </div>
                {entry.notes && <p className="text-gray-600">{entry.notes}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
