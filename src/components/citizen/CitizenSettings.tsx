import { useState } from 'react';
import { Bell, Lock, User, Eye, Globe } from 'lucide-react';

export function CitizenSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    bookingReminders: true,
    healthUpdates: true,
    communityNews: false,
    privateProfile: false,
    twoFactorAuth: false,
    theme: 'light' as 'light' | 'dark',
    language: 'en' as string,
  });

  const [saveMessage, setSaveMessage] = useState('');

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setSaveMessage('Settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">Manage your preferences and account settings.</p>
      </div>

      {/* Success Message */}
      {saveMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {saveMessage}
        </div>
      )}

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Email Notifications</div>
              <div className="text-sm text-gray-600">Receive updates via email</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={() => handleToggle('smsNotifications')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">SMS Notifications</div>
              <div className="text-sm text-gray-600">Receive text message alerts</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={() => handleToggle('pushNotifications')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Push Notifications</div>
              <div className="text-sm text-gray-600">Browser push notifications</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.bookingReminders}
              onChange={() => handleToggle('bookingReminders')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Booking Reminders</div>
              <div className="text-sm text-gray-600">Remind me of upcoming appointments</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.healthUpdates}
              onChange={() => handleToggle('healthUpdates')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Health Updates</div>
              <div className="text-sm text-gray-600">Receive health tips and information</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.communityNews}
              onChange={() => handleToggle('communityNews')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Community News</div>
              <div className="text-sm text-gray-600">Stay updated with community events</div>
            </div>
          </label>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.privateProfile}
              onChange={() => handleToggle('privateProfile')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Private Profile</div>
              <div className="text-sm text-gray-600">Hide your profile from other users</div>
            </div>
          </label>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={() => handleToggle('twoFactorAuth')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Two-Factor Authentication</div>
              <div className="text-sm text-gray-600">Add extra security to your account</div>
            </div>
          </label>
          <button className="w-full px-4 py-2 text-indigo-600 hover:bg-indigo-50 border border-indigo-300 rounded-lg transition-colors">
            Change Password
          </button>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Display Settings</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleSelectChange('theme', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleSelectChange('language', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="pt">Português</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Save Settings
        </button>
        <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium">
          Reset to Default
        </button>
      </div>
    </div>
  );
}
