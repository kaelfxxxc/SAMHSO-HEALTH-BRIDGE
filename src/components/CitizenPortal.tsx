import { useState } from 'react';
import { User } from '../App';
import { LogOut, Home, BookOpen, MessageCircle, ClipboardCheck, Users, Calendar, Settings } from 'lucide-react';
import { ResourceDirectory } from './citizen/ResourceDirectory';
import { HealthInformation } from './citizen/HealthInformation';
import { GroupChat } from './citizen/GroupChat';
import { SelfAssessment } from './citizen/SelfAssessment';
import { ProgressTracker } from './citizen/ProgressTracker';
import { AdvancedBooking } from './citizen/AdvancedBooking';
import { CitizenSettings } from './citizen/CitizenSettings';

interface CitizenPortalProps {
  user: User;
  onLogout: () => void;
}

type CitizenView = 'home' | 'resources' | 'health-info' | 'chat' | 'assessment' | 'tracker' | 'booking' | 'settings';

export function CitizenPortal({ user, onLogout }: CitizenPortalProps) {
  const [currentView, setCurrentView] = useState<CitizenView>('home');

  const navigation = [
    { id: 'home' as CitizenView, label: 'Home', icon: Home },
    { id: 'booking' as CitizenView, label: 'Advanced Booking', icon: Calendar },
    { id: 'resources' as CitizenView, label: 'Resource Directory', icon: BookOpen },
    { id: 'health-info' as CitizenView, label: 'Health Information', icon: ClipboardCheck },
    { id: 'chat' as CitizenView, label: 'Support Groups', icon: MessageCircle },
    { id: 'assessment' as CitizenView, label: 'Self-Assessment', icon: ClipboardCheck },
    { id: 'tracker' as CitizenView, label: 'Progress Tracker', icon: Users },
    { id: 'settings' as CitizenView, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">HealthBridge Initiative</h1>
                <p className="text-gray-600">Welcome, {user.name}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {currentView === 'home' && <HomeView />}
            {currentView === 'booking' && <AdvancedBooking />}
            {currentView === 'resources' && <ResourceDirectory />}
            {currentView === 'health-info' && <HealthInformation />}
            {currentView === 'chat' && <GroupChat userId={user.id} userName={user.name} />}
            {currentView === 'assessment' && <SelfAssessment />}
            {currentView === 'tracker' && <ProgressTracker userId={user.id} />}
            {currentView === 'settings' && <CitizenSettings />}
          </main>
        </div>
      </div>
    </div>
  );
}

function HomeView() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-white">
        <h2 className="text-white mb-2">Welcome to HealthBridge</h2>
        <p className="text-indigo-100">Your trusted resource for substance abuse support, health information, and community connection.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Resource Directory</h3>
          <p className="text-gray-600 mb-4">Find local rehabilitation centers, counseling services, and support groups in your area.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <ClipboardCheck className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Health Information</h3>
          <p className="text-gray-600 mb-4">Learn about substance risks, addiction signs, and preventive health measures.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Support Groups</h3>
          <p className="text-gray-600 mb-4">Join moderated group chats to connect with others on similar recovery journeys.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <ClipboardCheck className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Self-Assessment</h3>
          <p className="text-gray-600 mb-4">Take a confidential assessment to better understand your relationship with substances.</p>
        </div>
      </div>

      {/* Crisis Hotline */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-900 mb-2">Crisis Support</h3>
        <p className="text-red-800 mb-4">If you or someone you know is in crisis, help is available 24/7.</p>
        <div className="space-y-2">
          <p className="text-red-900"><strong>National Suicide Prevention Lifeline:</strong> 988</p>
          <p className="text-red-900"><strong>SAMHSA National Helpline:</strong> 1-800-662-4357</p>
        </div>
      </div>
    </div>
  );
}
