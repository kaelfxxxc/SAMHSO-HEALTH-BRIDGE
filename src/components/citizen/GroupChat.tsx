import { useState, useEffect, useRef } from 'react';
import { Send, Users, Shield } from 'lucide-react';

interface Message {
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
}

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
}

interface GroupChatProps {
  userId: string;
  userName: string;
}

const SUPPORT_GROUPS: Group[] = [
  { id: 'recovery', name: 'Recovery Support', description: 'A safe space for those in recovery to share experiences and support each other.', memberCount: 127 },
  { id: 'family', name: 'Family & Friends', description: 'For loved ones of those struggling with addiction. Share your journey and find support.', memberCount: 89 },
  { id: 'wellness', name: 'Wellness & Mindfulness', description: 'Discuss healthy coping strategies, meditation, exercise, and overall wellness.', memberCount: 156 },
  { id: 'youth', name: 'Youth Support', description: 'A moderated space for young people navigating substance-related challenges.', memberCount: 43 },
];

// Mock message storage
const messageStorage: { [key: string]: Message[] } = {
  recovery: [
    { id: '1', groupId: 'recovery', userId: 'user1', userName: 'Sarah M.', text: 'Celebrating 6 months sober today! This community has been such a blessing.', timestamp: new Date(Date.now() - 3600000) },
    { id: '2', groupId: 'recovery', userId: 'user2', userName: 'Mike R.', text: 'That\'s amazing Sarah! Congratulations on this milestone! 🎉', timestamp: new Date(Date.now() - 3000000) },
    { id: '3', groupId: 'recovery', userId: 'user3', userName: 'Jennifer L.', text: 'Having a tough day. Any advice for dealing with cravings?', timestamp: new Date(Date.now() - 1800000) },
    { id: '4', groupId: 'recovery', userId: 'user1', userName: 'Sarah M.', text: 'Jennifer, when I have cravings I try to distract myself with a walk or call my sponsor. You\'ve got this!', timestamp: new Date(Date.now() - 900000) },
  ],
  family: [
    { id: '1', groupId: 'family', userId: 'user4', userName: 'David P.', text: 'My son just entered rehab. Any advice for family members during this time?', timestamp: new Date(Date.now() - 7200000) },
    { id: '2', groupId: 'family', userId: 'user5', userName: 'Linda K.', text: 'David, remember to take care of yourself too. It\'s not selfish - you need to be healthy to support him.', timestamp: new Date(Date.now() - 5400000) },
  ],
  wellness: [
    { id: '1', groupId: 'wellness', userId: 'user6', userName: 'Alex T.', text: 'Started meditation this week. Anyone have good beginner resources?', timestamp: new Date(Date.now() - 10800000) },
    { id: '2', groupId: 'wellness', userId: 'user7', userName: 'Maria S.', text: 'I love the Calm and Headspace apps! Great for beginners.', timestamp: new Date(Date.now() - 9000000) },
  ],
  youth: [
    { id: '1', groupId: 'youth', userId: 'user8', userName: 'Jordan (Moderator)', text: 'Welcome everyone! Remember this is a judgment-free zone. We\'re here to support each other.', timestamp: new Date(Date.now() - 14400000) },
  ],
};

export function GroupChat({ userId, userName }: GroupChatProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>('recovery');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load messages for selected group
    setMessages(messageStorage[selectedGroup] || []);
  }, [selectedGroup]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      groupId: selectedGroup,
      userId,
      userName,
      text: newMessage,
      timestamp: new Date(),
    };

    // Add to messages
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    
    // Update storage
    messageStorage[selectedGroup] = updatedMessages;
    
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const currentGroup = SUPPORT_GROUPS.find(g => g.id === selectedGroup);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">Support Groups</h2>
        <p className="text-gray-600 mb-6">
          Join moderated support groups to connect with others on similar journeys. All conversations are confidential and moderated for safety.
        </p>

        {/* Group Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          {SUPPORT_GROUPS.map(group => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedGroup === group.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-gray-900">{group.name}</h3>
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{group.memberCount}</span>
                </div>
              </div>
              <p className="text-gray-600">{group.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
        {/* Chat Header */}
        <div className="bg-indigo-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white mb-1">{currentGroup?.name}</h3>
              <div className="flex items-center gap-2 text-indigo-100">
                <Users className="w-4 h-4" />
                <span>{currentGroup?.memberCount} members</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-indigo-700 px-3 py-1 rounded-full">
              <Shield className="w-4 h-4" />
              <span>Moderated</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.userId === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.userId === userId
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}
              >
                {message.userId !== userId && (
                  <p className={`mb-1 ${message.userId === userId ? 'text-indigo-100' : 'text-indigo-600'}`}>
                    {message.userName}
                  </p>
                )}
                <p className={message.userId === userId ? 'text-white' : 'text-gray-900'}>
                  {message.text}
                </p>
                <p className={`mt-1 ${message.userId === userId ? 'text-indigo-200' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-blue-900 mb-3">Community Guidelines</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span>Treat all members with respect and compassion</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span>Maintain confidentiality - what is shared here stays here</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span>No medical advice - always consult healthcare professionals</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
            <span>Report concerning messages to moderators</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
