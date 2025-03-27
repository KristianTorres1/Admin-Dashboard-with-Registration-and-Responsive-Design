import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Account } from '../utils/mockData';
const SellAccount: React.FC = () => {
  const {
    user
  } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    level: '',
    price: '',
    heroes: '',
    trophies: '',
    description: '',
    image: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!formData.level || !formData.price || !formData.heroes || !formData.trophies) {
      setError('Please fill in all required fields');
      return;
    }
    const newAccount: Account = {
      id: Date.now().toString(),
      level: formData.level,
      price: parseFloat(formData.price),
      heroes: formData.heroes,
      trophies: formData.trophies,
      description: formData.description,
      image: formData.image || 'https://via.placeholder.com/400x300',
      seller: user?.username || 'Unknown Seller'
    };
    // Get existing accounts and add new one
    const existingAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
    const updatedAccounts = [...existingAccounts, newAccount];
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    setSuccess('Account listed successfully!');
    setFormData({
      level: '',
      price: '',
      heroes: '',
      trophies: '',
      description: '',
      image: ''
    });
    // Redirect to home after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
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
          <h1 className="text-2xl font-bold mb-6">Sell Your Account</h1>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>}
          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="level">
                  Town Hall Level *
                </label>
                <input id="level" name="level" type="text" className="w-full border rounded px-3 py-2" value={formData.level} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="price">
                  Price (USD) *
                </label>
                <input id="price" name="price" type="number" min="0" step="0.01" className="w-full border rounded px-3 py-2" value={formData.price} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="heroes">
                  Heroes Levels *
                </label>
                <input id="heroes" name="heroes" type="text" className="w-full border rounded px-3 py-2" placeholder="BK 80, AQ 80, GW 55, RC 30" value={formData.heroes} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="trophies">
                  Trophies *
                </label>
                <input id="trophies" name="trophies" type="text" className="w-full border rounded px-3 py-2" value={formData.trophies} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="image">
                Image URL
              </label>
              <input id="image" name="image" type="text" className="w-full border rounded px-3 py-2" placeholder="https://example.com/image.jpg" value={formData.image} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description
              </label>
              <textarea id="description" name="description" className="w-full border rounded px-3 py-2" rows={4} value={formData.description} onChange={handleChange} placeholder="Describe your account (buildings, troops, achievements, etc.)" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              List Account
            </button>
          </form>
        </div>
      </div>
    </div>;
};
export default SellAccount;