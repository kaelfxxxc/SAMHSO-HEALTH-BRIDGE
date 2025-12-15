import { useState, useEffect } from 'react';
import { Users, Activity, Eye, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChartComponent } from '../charts/BarChartComponent';
import { LineChartComponent } from '../charts/LineChartComponent';
import { MapVisualization } from '../charts/MapVisualization';

// Mock data generator for realistic dashboard
const generateMockData = () => {
  return {
    stats: {
      totalUsers: 1247,
      activeToday: 342,
      totalResources: 48,
      avgSessionTime: '12m 34s'
    },
    geographicData: [
      { name: 'Pagsabungan', value: 456, color: '#4f46e5' },
      { name: 'Tabok', value: 389, color: '#7c3aed' },
      { name: 'Alang-Alang', value: 267, color: '#2563eb' },
      { name: 'Other Regions', value: 135, color: '#06b6d4' }
    ],
    topResources: [
      { name: 'Hope Recovery Center', value: 892 },
      { name: 'Community Counseling', value: 756 },
      { name: 'New Beginnings Group', value: 634 },
      { name: 'Serenity Clinic', value: 523 },
      { name: 'Chong Hua Hospital', value: 445 }
    ],
    userActivity: [
      { name: 'Mon', value: 245 },
      { name: 'Tue', value: 287 },
      { name: 'Wed', value: 312 },
      { name: 'Thu', value: 298 },
      { name: 'Fri', value: 334 },
      { name: 'Sat', value: 276 },
      { name: 'Sun', value: 342 }
    ]
  };
};

export function DashboardOverview() {
  const [data, setData] = useState(generateMockData());
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        stats: {
          ...prevData.stats,
          activeToday: prevData.stats.activeToday + Math.floor(Math.random() * 3) - 1
        }
      }));
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      label: 'Total Users',
      value: data.stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: 'Active Today',
      value: data.stats.activeToday.toLocaleString(),
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      label: 'Total Resources',
      value: data.stats.totalResources.toLocaleString(),
      icon: Eye,
      color: 'bg-purple-500'
    },
    {
      label: 'Avg Session Time',
      value: data.stats.avgSessionTime,
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">
            Real-time platform analytics and metrics
          </p>
        </div>
        <div className="text-gray-600">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 mb-1">{stat.label}</p>
              <p className="text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Geographic Distribution Map */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-gray-900 mb-1">Geographic Distribution</h3>
            <p className="text-gray-600">User sign-ups and activity by region</p>
          </div>
        </div>
        <MapVisualization data={data.geographicData} />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Service Demand Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-gray-900 mb-1">Service Demand</h3>
            <p className="text-gray-600">Top 5 most accessed resources (last 30 days)</p>
          </div>
          <BarChartComponent
            data={data.topResources}
            dataKey="value"
            nameKey="name"
            color="#4f46e5"
            height={300}
          />
          <div className="mt-4 text-gray-600">
            Total resource views: {data.topResources.reduce((sum, r) => sum + r.value, 0).toLocaleString()}
          </div>
        </div>

        {/* User Activity Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-gray-900 mb-1">User Activity</h3>
            <p className="text-gray-600">Daily login activity (last 7 days)</p>
          </div>
          <LineChartComponent
            data={data.userActivity}
            dataKey="value"
            nameKey="name"
            color="#10b981"
            height={300}
          />
          <div className="mt-4 text-gray-600">
            Average daily logins: {Math.round(data.userActivity.reduce((sum, d) => sum + d.value, 0) / data.userActivity.length).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-gray-900 mb-4">Support Group Activity</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recovery Support</span>
              <span className="text-gray-900">127 members</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Family & Friends</span>
              <span className="text-gray-900">89 members</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Wellness</span>
              <span className="text-gray-900">156 members</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Youth Support</span>
              <span className="text-gray-900">43 members</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-gray-900 mb-4">Resource Categories</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rehabilitation Centers</span>
              <span className="text-gray-900">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Counseling Services</span>
              <span className="text-gray-900">22</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Support Groups</span>
              <span className="text-gray-900">8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-gray-900 mb-4">System Health</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Platform Status</span>
              <span className="inline-flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                Operational
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Response Time</span>
              <span className="text-gray-900">124ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Uptime</span>
              <span className="text-gray-900">99.9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-blue-900 mb-2">Real-time Data Updates</h4>
            <p className="text-blue-800">
              This dashboard displays near real-time metrics. Data is automatically refreshed every 5 seconds to provide the most current platform statistics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
