import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
interface BuyerPost {
  id: string;
  userId: string;
  username: string;
  desiredLevel: string;
  budget: number;
  requirements: string;
  contactInfo: string;
  createdAt: string;
}
const BuyerPosting: React.FC = () => {
  const {
    user
  } = useUser();
  const [posts, setPosts] = useState<BuyerPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    desiredLevel: '',
    budget: '',
    requirements: '',
    contactInfo: user?.contactInfo || ''
  });
  useEffect(() => {
    const storedPosts = localStorage.getItem('buyerPosts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.desiredLevel || !formData.budget || !formData.requirements) {
      setError('Please fill in all required fields');
      return;
    }
    const newPost: BuyerPost = {
      id: Date.now().toString(),
      userId: user?.id || '',
      username: user?.username || '',
      desiredLevel: formData.desiredLevel,
      budget: parseFloat(formData.budget),
      requirements: formData.requirements,
      contactInfo: formData.contactInfo,
      createdAt: new Date().toISOString()
    };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('buyerPosts', JSON.stringify(updatedPosts));
    setSuccess('Post created successfully!');
    setShowForm(false);
    setFormData({
      desiredLevel: '',
      budget: '',
      requirements: '',
      contactInfo: user?.contactInfo || ''
    });
  };
  const handleDelete = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('buyerPosts', JSON.stringify(updatedPosts));
  };
  return <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Buyer Requests</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {showForm ? 'Cancel' : 'Create Request'}
          </button>
        </div>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>}
        {showForm && <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create Buyer Request</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="desiredLevel">
                    Desired Town Hall Level *
                  </label>
                  <input id="desiredLevel" type="text" className="w-full border rounded px-3 py-2" value={formData.desiredLevel} onChange={e => setFormData(prev => ({
                ...prev,
                desiredLevel: e.target.value
              }))} required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="budget">
                    Budget (USD) *
                  </label>
                  <input id="budget" type="number" min="0" step="0.01" className="w-full border rounded px-3 py-2" value={formData.budget} onChange={e => setFormData(prev => ({
                ...prev,
                budget: e.target.value
              }))} required />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="requirements">
                  Requirements *
                </label>
                <textarea id="requirements" className="w-full border rounded px-3 py-2" rows={4} value={formData.requirements} onChange={e => setFormData(prev => ({
              ...prev,
              requirements: e.target.value
            }))} placeholder="Describe what you're looking for (hero levels, troops, etc.)" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="contactInfo">
                  Contact Information
                </label>
                <input id="contactInfo" type="text" className="w-full border rounded px-3 py-2" value={formData.contactInfo} onChange={e => setFormData(prev => ({
              ...prev,
              contactInfo: e.target.value
            }))} placeholder="How should sellers contact you?" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Post Request
              </button>
            </form>
          </div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold">TH{post.desiredLevel} Wanted</h3>
                  <p className="text-sm text-gray-600">by {post.username}</p>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  ${post.budget}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm">{post.requirements}</p>
                {post.contactInfo && <p className="text-sm text-gray-600">
                    Contact: {post.contactInfo}
                  </p>}
                <p className="text-xs text-gray-500">
                  Posted: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
              {user?.id === post.userId && <button onClick={() => handleDelete(post.id)} className="text-red-600 text-sm hover:text-red-800">
                  Delete Post
                </button>}
            </div>)}
        </div>
        {posts.length === 0 && !showForm && <div className="text-center text-gray-600 py-8">
            No buyer requests yet. Be the first to create one!
          </div>}
      </div>
    </div>;
};
export default BuyerPosting;