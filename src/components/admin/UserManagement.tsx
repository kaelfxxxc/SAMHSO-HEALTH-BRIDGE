import { useState, useMemo } from 'react';
import { Search, UserX, Eye, Filter, Mail, Calendar } from 'lucide-react';

interface CitizenUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive';
  activityLevel: 'high' | 'medium' | 'low';
}

const MOCK_USERS: CitizenUser[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', joinDate: '2024-01-15', lastActive: '2024-12-12', status: 'active', activityLevel: 'high' },
  { id: '2', name: 'Sarah Martinez', email: 'sarah.m@example.com', joinDate: '2024-02-20', lastActive: '2024-12-11', status: 'active', activityLevel: 'high' },
  { id: '3', name: 'Michael Chen', email: 'mchen@example.com', joinDate: '2024-03-10', lastActive: '2024-12-10', status: 'active', activityLevel: 'medium' },
  { id: '4', name: 'Emily Johnson', email: 'emily.j@example.com', joinDate: '2024-03-25', lastActive: '2024-12-12', status: 'active', activityLevel: 'high' },
  { id: '5', name: 'David Thompson', email: 'dthompson@example.com', joinDate: '2024-04-05', lastActive: '2024-11-28', status: 'active', activityLevel: 'low' },
  { id: '6', name: 'Lisa Anderson', email: 'landerson@example.com', joinDate: '2024-04-18', lastActive: '2024-12-09', status: 'active', activityLevel: 'medium' },
  { id: '7', name: 'Robert Garcia', email: 'rgarcia@example.com', joinDate: '2024-05-12', lastActive: '2024-12-12', status: 'active', activityLevel: 'high' },
  { id: '8', name: 'Jennifer Lee', email: 'jlee@example.com', joinDate: '2024-06-01', lastActive: '2024-10-15', status: 'inactive', activityLevel: 'low' },
  { id: '9', name: 'William Brown', email: 'wbrown@example.com', joinDate: '2024-07-08', lastActive: '2024-12-11', status: 'active', activityLevel: 'medium' },
  { id: '10', name: 'Amanda Wilson', email: 'awilson@example.com', joinDate: '2024-08-22', lastActive: '2024-12-10', status: 'active', activityLevel: 'high' },
  { id: '11', name: 'James Taylor', email: 'jtaylor@example.com', joinDate: '2024-09-14', lastActive: '2024-09-20', status: 'inactive', activityLevel: 'low' },
  { id: '12', name: 'Jessica Moore', email: 'jmoore@example.com', joinDate: '2024-10-03', lastActive: '2024-12-12', status: 'active', activityLevel: 'medium' },
];

export function UserManagement() {
  const [users, setUsers] = useState<CitizenUser[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedUser, setSelectedUser] = useState<CitizenUser | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  const handleDeactivateUser = (userId: string) => {
    if (window.confirm('Are you sure you want to deactivate this user account?')) {
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status: 'inactive' as const } : user
      ));
      setSelectedUser(null);
    }
  };

  const handleActivateUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'active' as const } : user
    ));
    setSelectedUser(null);
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    highActivity: users.filter(u => u.activityLevel === 'high').length
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">User Management</h2>
        <p className="text-gray-600">
          View, search, and manage citizen accounts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 mb-1">Total Users</p>
          <p className="text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 mb-1">Active Users</p>
          <p className="text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 mb-1">Inactive Users</p>
          <p className="text-gray-600">{stats.inactive}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 mb-1">High Activity</p>
          <p className="text-indigo-600">{stats.highActivity}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-gray-600">
          Showing {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">User</th>
                <th className="px-6 py-3 text-left text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-gray-700">Activity Level</th>
                <th className="px-6 py-3 text-left text-gray-700">Join Date</th>
                <th className="px-6 py-3 text-left text-gray-700">Last Active</th>
                <th className="px-6 py-3 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-gray-900">{user.name}</p>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        user.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                      }`} />
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${
                      user.activityLevel === 'high' ? 'bg-indigo-100 text-indigo-700' :
                      user.activityLevel === 'medium' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.activityLevel.charAt(0).toUpperCase() + user.activityLevel.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {user.status === 'active' && (
                        <button
                          onClick={() => handleDeactivateUser(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Deactivate User"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center text-gray-600">
            No users found matching your criteria.
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-gray-900">User Details</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Name</p>
                  <p className="text-gray-900">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{selectedUser.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Status</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${
                    selectedUser.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      selectedUser.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                    }`} />
                    {selectedUser.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Activity Level</p>
                  <span className={`px-3 py-1 rounded-full ${
                    selectedUser.activityLevel === 'high' ? 'bg-indigo-100 text-indigo-700' :
                    selectedUser.activityLevel === 'medium' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedUser.activityLevel.charAt(0).toUpperCase() + selectedUser.activityLevel.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Join Date</p>
                  <p className="text-gray-900">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Last Active</p>
                  <p className="text-gray-900">{new Date(selectedUser.lastActive).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedUser.status === 'active' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-red-900 mb-2">Deactivate Account</h4>
                  <p className="text-red-800 mb-4">
                    Deactivating this account will prevent the user from accessing the platform. This action can be reversed.
                  </p>
                  <button
                    onClick={() => handleDeactivateUser(selectedUser.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Deactivate Account
                  </button>
                </div>
              )}

              {selectedUser.status === 'inactive' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-green-900 mb-2">Reactivate Account</h4>
                  <p className="text-green-800 mb-4">
                    Reactivating this account will restore the user's access to the platform.
                  </p>
                  <button
                    onClick={() => handleActivateUser(selectedUser.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Reactivate Account
                  </button>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
