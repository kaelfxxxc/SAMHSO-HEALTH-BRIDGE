import { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Clock, Filter, ExternalLink } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  category: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  description: string;
  services: string[];
}

const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    name: 'Hope Recovery Center',
    category: 'Rehabilitation Center',
    address: '123 Main Street',
    city: 'Springfield',
    phone: '(555) 123-4567',
    hours: 'Mon-Fri 8:00 AM - 8:00 PM',
    description: 'Comprehensive inpatient and outpatient rehabilitation programs for substance abuse.',
    services: ['Inpatient Treatment', 'Outpatient Programs', 'Family Counseling', 'Detoxification']
  },
  {
    id: '2',
    name: 'Community Counseling Services',
    category: 'Counseling',
    address: '456 Oak Avenue',
    city: 'Springfield',
    phone: '(555) 234-5678',
    hours: 'Mon-Sat 9:00 AM - 6:00 PM',
    description: 'Professional counseling services for individuals and families affected by substance abuse.',
    services: ['Individual Therapy', 'Group Therapy', 'Family Counseling', 'Crisis Intervention']
  },
  {
    id: '3',
    name: 'New Beginnings Support Group',
    category: 'Support Group',
    address: '789 Elm Street',
    city: 'Riverside',
    phone: '(555) 345-6789',
    hours: 'Tue, Thu 7:00 PM - 9:00 PM',
    description: 'Peer-led support group for individuals in recovery from addiction.',
    services: ['Peer Support', 'Weekly Meetings', 'Sponsor Programs', 'Social Events']
  },
  {
    id: '4',
    name: 'Serenity Mental Health Clinic',
    category: 'Counseling',
    address: '321 Pine Road',
    city: 'Riverside',
    phone: '(555) 456-7890',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM',
    description: 'Mental health services specializing in dual diagnosis and substance abuse treatment.',
    services: ['Psychiatric Care', 'Medication Management', 'Individual Therapy', 'Case Management']
  },
  {
    id: '5',
    name: 'Phoenix Rehabilitation Hospital',
    category: 'Rehabilitation Center',
    address: '654 Cedar Lane',
    city: 'Lakewood',
    phone: '(555) 567-8901',
    hours: '24/7 Emergency Services',
    description: 'Full-service hospital with specialized addiction treatment programs.',
    services: ['Emergency Care', 'Inpatient Treatment', 'Medical Detox', 'Aftercare Planning']
  },
  {
    id: '6',
    name: 'Family First Counseling',
    category: 'Counseling',
    address: '987 Birch Boulevard',
    city: 'Lakewood',
    phone: '(555) 678-9012',
    hours: 'Mon-Fri 10:00 AM - 7:00 PM',
    description: 'Family-focused counseling to support loved ones of those struggling with addiction.',
    services: ['Family Therapy', 'Education Programs', 'Support Groups', 'Al-Anon Meetings']
  },
  {
    id: '7',
    name: 'Recovery Path AA Group',
    category: 'Support Group',
    address: '147 Maple Drive',
    city: 'Springfield',
    phone: '(555) 789-0123',
    hours: 'Daily 6:00 PM - 8:00 PM',
    description: 'Alcoholics Anonymous meetings following the 12-step program.',
    services: ['Daily Meetings', 'Sponsorship', '12-Step Program', 'Fellowship']
  },
  {
    id: '8',
    name: 'Youth Outreach Center',
    category: 'Support Group',
    address: '258 Valley View',
    city: 'Riverside',
    phone: '(555) 890-1234',
    hours: 'Mon-Fri 3:00 PM - 9:00 PM',
    description: 'Programs specifically designed for youth struggling with substance use.',
    services: ['Teen Support Groups', 'Educational Programs', 'Mentorship', 'Recreation Activities']
  }
];

export function ResourceDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(MOCK_RESOURCES.map(r => r.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const cities = useMemo(() => {
    const citiesSet = new Set(MOCK_RESOURCES.map(r => r.city));
    return ['All', ...Array.from(citiesSet)];
  }, []);

  const filteredResources = useMemo(() => {
    return MOCK_RESOURCES.filter(resource => {
      const matchesSearch = 
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      const matchesCity = selectedCity === 'All' || resource.city === selectedCity;

      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [searchQuery, selectedCategory, selectedCity]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-gray-900 mb-4">Resource Directory</h2>
        <p className="text-gray-600 mb-6">Find local rehabilitation centers, counseling services, and support groups.</p>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources, services, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Filters:</span>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="text-gray-600">
        Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
      </div>

      {/* Resource Cards */}
      <div className="grid gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 mb-1">{resource.name}</h3>
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                  {resource.category}
                </span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <span>Visit</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">{resource.description}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">{resource.address}</p>
                  <p className="text-gray-600">{resource.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">{resource.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:col-span-2">
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-900">{resource.hours}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-gray-700 mb-2">Services Offered:</p>
              <div className="flex flex-wrap gap-2">
                {resource.services.map(service => (
                  <span key={service} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-600">No resources found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedCity('All');
            }}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
