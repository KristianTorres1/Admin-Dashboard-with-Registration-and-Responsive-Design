import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { UserIcon } from 'lucide-react';
const UserProfile: React.FC = () => {
  const {
    user,
    updateProfile
  } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    contactInfo: user?.contactInfo || ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.username || !formData.email) {
      setError('Username and email are required');
      return;
    }
    updateProfile({
      username: formData.username,
      email: formData.email,
      contactInfo: formData.contactInfo
    });
    setSuccess('Profile updated successfully');
    setIsEditing(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>}
          {!isEditing ? <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="bg-gray-200 p-4 rounded-full">
                  <UserIcon size={64} className="text-gray-600" />
                </div>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-gray-600 text-sm">Username</h3>
                <p className="text-lg">{user?.username}</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-gray-600 text-sm">Email</h3>
                <p className="text-lg">{user?.email}</p>
              </div>
              <div>
                <h3 className="text-gray-600 text-sm">Contact Information</h3>
                <p className="text-lg">
                  {user?.contactInfo || 'No contact information provided'}
                </p>
              </div>
            </div> : <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="username">
                  Username
                </label>
                <input id="username" name="username" type="text" className="w-full border rounded px-3 py-2" value={formData.username} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input id="email" name="email" type="email" className="w-full border rounded px-3 py-2" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="contactInfo">
                  Contact Information
                </label>
                <textarea id="contactInfo" name="contactInfo" className="w-full border rounded px-3 py-2" value={formData.contactInfo} onChange={handleChange} rows={3} placeholder="Add your preferred contact method (Discord, Telegram, etc.)" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Save Changes
              </button>
            </form>}
        </div>
      </div>
    </div>;
};
export default UserProfile;