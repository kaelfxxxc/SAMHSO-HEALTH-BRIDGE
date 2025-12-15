import { useState } from 'react';
import { Lock, Globe, Bell, Database, Shield, Users } from 'lucide-react';

export function AdminSettings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: true,
    autoBackup: true,
    backupFrequency: 'daily' as string,
    logActivity: true,
    apiEnabled: true,
    dataRetention: '90' as string,
    maxLoginAttempts: '5' as string,
    sessionTimeout: '30' as string,
    allowApiKeys: true,
    notifyOnBreach: true,
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
    setSaveMessage('Admin settings saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Settings</h2>
        <p className="text-gray-600">Configure system-wide settings and preferences.</p>
      </div>

      {/* Success Message */}
      {saveMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {saveMessage}
        </div>
      )}

      {/* System Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">System Settings</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={() => handleToggle('maintenanceMode')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Maintenance Mode</div>
              <div className="text-sm text-gray-600">Disable user access for maintenance</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowNewRegistrations}
              onChange={() => handleToggle('allowNewRegistrations')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Allow New Registrations</div>
              <div className="text-sm text-gray-600">Enable or disable new user signups</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.requireEmailVerification}
              onChange={() => handleToggle('requireEmailVerification')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Require Email Verification</div>
              <div className="text-sm text-gray-600">Users must verify email to sign up</div>
            </div>
          </label>
        </div>
      </div>

      {/* Backup Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Backup Settings</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoBackup}
              onChange={() => handleToggle('autoBackup')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Automatic Backups</div>
              <div className="text-sm text-gray-600">Enable automatic database backups</div>
            </div>
          </label>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Backup Frequency</label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleSelectChange('backupFrequency', e.target.value)}
              disabled={!settings.autoBackup}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Data Retention (days)</label>
            <input
              type="number"
              value={settings.dataRetention}
              onChange={(e) => handleSelectChange('dataRetention', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              min="30"
              max="365"
            />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Max Login Attempts</label>
            <input
              type="number"
              value={settings.maxLoginAttempts}
              onChange={(e) => handleSelectChange('maxLoginAttempts', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              min="3"
              max="10"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSelectChange('sessionTimeout', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              min="15"
              max="480"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifyOnBreach}
              onChange={() => handleToggle('notifyOnBreach')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Notify on Security Breach</div>
              <div className="text-sm text-gray-600">Alert admins of potential security issues</div>
            </div>
          </label>
        </div>
      </div>

      {/* Activity Logging */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Activity Logging</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.logActivity}
              onChange={() => handleToggle('logActivity')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Log User Activity</div>
              <div className="text-sm text-gray-600">Record all user actions for auditing</div>
            </div>
          </label>
        </div>
      </div>

      {/* API Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">API Settings</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.apiEnabled}
              onChange={() => handleToggle('apiEnabled')}
              className="w-4 h-4 rounded border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900">Enable API</div>
              <div className="text-sm text-gray-600">Allow third-party API access</div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowApiKeys}
              onChange={() => handleToggle('allowApiKeys')}
              disabled={!settings.apiEnabled}
              className="w-4 h-4 rounded border-gray-300 disabled:opacity-50"
            />
            <div>
              <div className="font-medium text-gray-900">Allow API Keys</div>
              <div className="text-sm text-gray-600">Users can generate API keys</div>
            </div>
          </label>
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

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-lg shadow-sm p-6 border-l-4 border-red-600">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
        <div className="space-y-2">
          <button className="w-full px-4 py-2 text-red-700 hover:bg-red-100 border border-red-300 rounded-lg transition-colors">
            Clear All Logs
          </button>
          <button className="w-full px-4 py-2 text-red-700 hover:bg-red-100 border border-red-300 rounded-lg transition-colors">
            Reset System
          </button>
        </div>
      </div>
    </div>
  );
}
