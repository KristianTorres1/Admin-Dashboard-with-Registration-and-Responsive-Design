import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboardIcon, LogOutIcon, PlusIcon, HomeIcon, UsersIcon, SettingsIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AccountCard from '../components/AccountCard';
import { accounts as initialAccounts, Account } from '../utils/mockData';
const AdminDashboard: React.FC = () => {
  const {
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [activeTab, setActiveTab] = useState('accounts');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    level: '',
    image: '',
    price: '',
    seller: '',
    heroes: '',
    trophies: '',
    description: ''
  });
  useEffect(() => {
    // Load accounts from localStorage or use initial data
    const storedAccounts = localStorage.getItem('accounts');
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    } else {
      setAccounts(initialAccounts);
      localStorage.setItem('accounts', JSON.stringify(initialAccounts));
    }
  }, []);
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleDeleteAccount = (id: string) => {
    const updatedAccounts = accounts.filter(account => account.id !== id);
    setAccounts(updatedAccounts);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setNewAccount(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Date.now().toString();
    const accountToAdd: Account = {
      id: newId,
      level: newAccount.level,
      image: newAccount.image || 'https://via.placeholder.com/400x300',
      price: parseFloat(newAccount.price) || 0,
      seller: newAccount.seller,
      heroes: newAccount.heroes,
      trophies: newAccount.trophies,
      description: newAccount.description
    };
    const updatedAccounts = [...accounts, accountToAdd];
    setAccounts(updatedAccounts);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    // Reset form
    setNewAccount({
      level: '',
      image: '',
      price: '',
      seller: '',
      heroes: '',
      trophies: '',
      description: ''
    });
    setShowAddForm(false);
  };
  return <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white min-h-screen p-4">
        <div className="flex items-center space-x-2 mb-8">
          <LayoutDashboardIcon size={24} />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            <li>
              <button className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'accounts' ? 'bg-blue-700' : 'hover:bg-blue-700'}`} onClick={() => setActiveTab('accounts')}>
                <HomeIcon size={18} />
                <span>Accounts</span>
              </button>
            </li>
            <li>
              <button className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'users' ? 'bg-blue-700' : 'hover:bg-blue-700'}`} onClick={() => setActiveTab('users')}>
                <UsersIcon size={18} />
                <span>Users</span>
              </button>
            </li>
            <li>
              <button className={`flex items-center space-x-2 w-full p-2 rounded ${activeTab === 'settings' ? 'bg-blue-700' : 'hover:bg-blue-700'}`} onClick={() => setActiveTab('settings')}>
                <SettingsIcon size={18} />
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-4 left-4">
          <button className="flex items-center space-x-2 text-white hover:text-red-300" onClick={handleLogout}>
            <LogOutIcon size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'accounts' && <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Accounts</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center" onClick={() => setShowAddForm(!showAddForm)}>
                <PlusIcon size={18} className="mr-2" />
                Add New Account
              </button>
            </div>
            {showAddForm && <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h3 className="text-lg font-bold mb-4">Add New Account</h3>
                <form onSubmit={handleAddAccount}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        TH Level
                      </label>
                      <input type="text" name="level" className="w-full border rounded px-3 py-2" value={newAccount.level} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input type="number" name="price" className="w-full border rounded px-3 py-2" value={newAccount.price} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Seller Name
                      </label>
                      <input type="text" name="seller" className="w-full border rounded px-3 py-2" value={newAccount.seller} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input type="text" name="image" className="w-full border rounded px-3 py-2" value={newAccount.image} onChange={handleInputChange} placeholder="https://example.com/image.jpg" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Heroes</label>
                      <input type="text" name="heroes" className="w-full border rounded px-3 py-2" value={newAccount.heroes} onChange={handleInputChange} placeholder="BK 80, AQ 80, GW 55, RC 30" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Trophies
                      </label>
                      <input type="text" name="trophies" className="w-full border rounded px-3 py-2" value={newAccount.trophies} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea name="description" className="w-full border rounded px-3 py-2" rows={3} value={newAccount.description} onChange={handleInputChange} required></textarea>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                      Add Account
                    </button>
                  </div>
                </form>
              </div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map(account => <AccountCard key={account.id} id={account.id} level={account.level} image={account.image} price={account.price} seller={account.seller} heroes={account.heroes} trophies={account.trophies} description={account.description} onDelete={handleDeleteAccount} isAdmin={true} />)}
            </div>
          </>}
        {activeTab === 'users' && <div>
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
              User management functionality coming soon.
            </div>
          </div>}
        {activeTab === 'settings' && <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
              Settings functionality coming soon.
            </div>
          </div>}
      </div>
    </div>;
};
export default AdminDashboard;