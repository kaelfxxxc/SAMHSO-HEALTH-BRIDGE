import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

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

interface HealthArticle {
  id: string;
  title: string;
  category: string;
  content: string;
}

type ContentType = 'resources' | 'articles';

const INITIAL_RESOURCES: Resource[] = [
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
  }
];

const INITIAL_ARTICLES: HealthArticle[] = [
  {
    id: '1',
    title: 'Understanding Substance Abuse and Addiction',
    category: 'General Information',
    content: 'Substance abuse is a pattern of harmful use of any substance for mood-altering purposes...'
  },
  {
    id: '2',
    title: 'Recognizing Signs of Substance Abuse',
    category: 'Warning Signs',
    content: 'Recognizing the signs of substance abuse early can make a significant difference...'
  }
];

export function ContentManagement() {
  const [contentType, setContentType] = useState<ContentType>('resources');
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [articles, setArticles] = useState<HealthArticle[]>(INITIAL_ARTICLES);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [editingArticle, setEditingArticle] = useState<HealthArticle | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Resource handlers
  const handleAddResource = () => {
    setEditingResource({
      id: Date.now().toString(),
      name: '',
      category: 'Rehabilitation Center',
      address: '',
      city: '',
      phone: '',
      hours: '',
      description: '',
      services: []
    });
    setIsAdding(true);
  };

  const handleSaveResource = () => {
    if (!editingResource) return;

    if (isAdding) {
      setResources([...resources, editingResource]);
    } else {
      setResources(resources.map(r => r.id === editingResource.id ? editingResource : r));
    }
    
    setEditingResource(null);
    setIsAdding(false);
  };

  const handleDeleteResource = (id: string) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  // Article handlers
  const handleAddArticle = () => {
    setEditingArticle({
      id: Date.now().toString(),
      title: '',
      category: 'General Information',
      content: ''
    });
    setIsAdding(true);
  };

  const handleSaveArticle = () => {
    if (!editingArticle) return;

    if (isAdding) {
      setArticles([...articles, editingArticle]);
    } else {
      setArticles(articles.map(a => a.id === editingArticle.id ? editingArticle : a));
    }
    
    setEditingArticle(null);
    setIsAdding(false);
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingResource(null);
    setEditingArticle(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-2">Content Management</h2>
        <p className="text-gray-600">
          Add, edit, or remove resources and health information
        </p>
      </div>

      {/* Content Type Selector */}
      <div className="flex gap-4">
        <button
          onClick={() => setContentType('resources')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            contentType === 'resources'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Resource Directory
        </button>
        <button
          onClick={() => setContentType('articles')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            contentType === 'articles'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Health Information
        </button>
      </div>

      {/* Resources Management */}
      {contentType === 'resources' && (
        <div className="space-y-6">
          {!editingResource && !isAdding && (
            <div className="flex justify-start">
              <button
                onClick={handleAddResource}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Resource</span>
              </button>
            </div>
          )}

          {/* Resource Editor */}
          {editingResource && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-900 mb-6">
                {isAdding ? 'Add New Resource' : 'Edit Resource'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Resource Name *</label>
                  <input
                    type="text"
                    value={editingResource.name}
                    onChange={(e) => setEditingResource({ ...editingResource, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Hope Recovery Center"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Category *</label>
                  <select
                    value={editingResource.category}
                    onChange={(e) => setEditingResource({ ...editingResource, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option>Rehabilitation Center</option>
                    <option>Counseling</option>
                    <option>Support Group</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Address *</label>
                  <input
                    type="text"
                    value={editingResource.address}
                    onChange={(e) => setEditingResource({ ...editingResource, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={editingResource.city}
                    onChange={(e) => setEditingResource({ ...editingResource, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Springfield"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Phone *</label>
                  <input
                    type="text"
                    value={editingResource.phone}
                    onChange={(e) => setEditingResource({ ...editingResource, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Hours *</label>
                  <input
                    type="text"
                    value={editingResource.hours}
                    onChange={(e) => setEditingResource({ ...editingResource, hours: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Mon-Fri 8:00 AM - 5:00 PM"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description *</label>
                <textarea
                  value={editingResource.description}
                  onChange={(e) => setEditingResource({ ...editingResource, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Brief description of services offered..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Services (comma-separated)</label>
                <input
                  type="text"
                  value={editingResource.services.join(', ')}
                  onChange={(e) => setEditingResource({ 
                    ...editingResource, 
                    services: e.target.value.split(',').map(s => s.trim()).filter(s => s) 
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Inpatient Treatment, Counseling, Support Groups"
                />
              </div>

              <div className="flex gap-4 justify-start">
                <button
                  onClick={handleSaveResource}
                  disabled={!editingResource.name || !editingResource.address}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Resource</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          )}

          {/* Resources List */}
          {!editingResource && (
            <div className="space-y-4">
              {resources.map(resource => (
                <div key={resource.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 mb-1">{resource.name}</h3>
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                        {resource.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingResource(resource)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteResource(resource.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{resource.description}</p>
                  <p className="text-gray-600">{resource.address}, {resource.city}</p>
                  <p className="text-gray-600">{resource.phone} • {resource.hours}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Articles Management */}
      {contentType === 'articles' && (
        <div className="space-y-6">
          {!editingArticle && !isAdding && (
            <div className="flex justify-start">
              <button
                onClick={handleAddArticle}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Article</span>
              </button>
            </div>
          )}

          {/* Article Editor */}
          {editingArticle && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-gray-900 mb-6">
                {isAdding ? 'Add New Article' : 'Edit Article'}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Understanding Substance Abuse"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Category *</label>
                  <select
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option>General Information</option>
                    <option>Warning Signs</option>
                    <option>Substance Information</option>
                    <option>Prevention</option>
                    <option>Family Support</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Content *</label>
                <textarea
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Article content..."
                />
              </div>

              <div className="flex gap-4 justify-start">
                <button
                  onClick={handleSaveArticle}
                  disabled={!editingArticle.title || !editingArticle.content}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Article</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          )}

          {/* Articles List */}
          {!editingArticle && (
            <div className="space-y-4">
              {articles.map(article => (
                <div key={article.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900 mb-1">{article.title}</h3>
                      <span className="text-indigo-600">{article.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingArticle(article)}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 line-clamp-3">{article.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
