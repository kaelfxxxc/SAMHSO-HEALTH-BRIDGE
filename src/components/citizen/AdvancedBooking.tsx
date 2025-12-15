import { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, MessageSquare } from 'lucide-react';

interface Booking {
  id: string;
  serviceType: string;
  date: string;
  time: string;
  provider: string;
  location: string;
  phone: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export function AdvancedBooking() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      serviceType: 'Counseling Session',
      date: '2025-12-20',
      time: '10:00 AM',
      provider: 'Dr. Sarah Johnson',
      location: 'Main Clinic',
      phone: '555-0123',
      notes: 'Initial consultation',
      status: 'confirmed',
      createdAt: '2025-12-12',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    serviceType: '',
    date: '',
    time: '',
    provider: '',
    location: '',
    phone: '',
    notes: '',
  });

  const serviceTypes = [
    'Counseling Session',
    'Medical Checkup',
    'Support Group Meeting',
    'Intake Assessment',
    'Follow-up Visit',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.serviceType || !formData.date || !formData.time) {
      alert('Please fill in required fields');
      return;
    }

    const newBooking: Booking = {
      id: String(Date.now()),
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setBookings([newBooking, ...bookings]);
    setFormData({
      serviceType: '',
      date: '',
      time: '',
      provider: '',
      location: '',
      phone: '',
      notes: '',
    });
    setShowForm(false);
  };

  const cancelBooking = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Advanced Booking</h2>
        <p className="text-gray-600">Schedule appointments and book services with healthcare providers.</p>
      </div>

      {/* New Booking Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        {showForm ? 'Cancel' : '+ New Booking'}
      </button>

      {/* Booking Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Booking</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Service Type *</label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a service</option>
                  {serviceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Time *</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Provider Name</label>
                <input
                  type="text"
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  placeholder="Dr. Name or Provider"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Clinic or office location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Contact Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="555-0123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any special requests or notes..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}

      {/* Bookings List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Bookings</h3>
        {bookings.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No bookings yet. Create one to get started.</p>
          </div>
        ) : (
          bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-500 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{booking.serviceType}</h4>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                {booking.status === 'pending' || booking.status === 'confirmed' ? (
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Cancel
                  </button>
                ) : null}
              </div>

              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <span>{booking.time}</span>
                </div>
                {booking.provider && (
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    <span>{booking.provider}</span>
                  </div>
                )}
                {booking.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                    <span>{booking.location}</span>
                  </div>
                )}
                {booking.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-indigo-600" />
                    <span>{booking.phone}</span>
                  </div>
                )}
                {booking.notes && (
                  <div className="flex items-start gap-2 mt-3 pt-3 border-t">
                    <MessageSquare className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{booking.notes}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
