import { useState } from 'react';
import { User } from '../App';
import { LogOut, LayoutDashboard, Users as UsersIcon, FileText, Calendar, Settings } from 'lucide-react';
import { DashboardOverview } from './admin/DashboardOverview';
import { UserManagement } from './admin/UserManagement';
import { ContentManagement } from './admin/ContentManagement';
import { BookingManagement } from './admin/BookingManagement';
import { AdminSettings } from './admin/AdminSettings';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

type AdminView = 'dashboard' | 'users' | 'content' | 'bookings' | 'settings';

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  const navigation = [
    { id: 'dashboard' as AdminView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings' as AdminView, label: 'Booking Management', icon: Calendar },
    { id: 'users' as AdminView, label: 'User Management', icon: UsersIcon },
    { id: 'content' as AdminView, label: 'Content Management', icon: FileText },
    { id: 'settings' as AdminView, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">HealthBridge Admin</h1>
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
            {currentView === 'dashboard' && <DashboardOverview />}
            {currentView === 'bookings' && <BookingManagement />}
            {currentView === 'users' && <UserManagement />}
            {currentView === 'content' && <ContentManagement />}
            {currentView === 'settings' && <AdminSettings />}
          </main>
        </div>
      </div>
    </div>
  );
}
