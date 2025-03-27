import React, { useState } from 'react';
import AccountCard from '../components/AccountCard';
import SearchBar from '../components/SearchBar';
import { accounts as initialAccounts } from '../utils/mockData';
const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  // Get accounts from localStorage or use initial data
  const getAccounts = () => {
    const storedAccounts = localStorage.getItem('accounts');
    return storedAccounts ? JSON.parse(storedAccounts) : initialAccounts;
  };
  const [accounts] = useState(getAccounts);
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.seller.toLowerCase().includes(searchQuery.toLowerCase()) || account.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter ? account.level === filter : true;
    return matchesSearch && matchesFilter;
  });
  return <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Clash of Clans Marketplace</h1>
        <p className="text-xl mb-6">
          Buy and sell Clash of Clans accounts safely and easily
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">
          Join Now
        </button>
      </div>
      {/* Listings Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Available Accounts</h2>
        <SearchBar onSearch={setSearchQuery} onFilter={setFilter} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map(account => <AccountCard key={account.id} id={account.id} level={account.level} image={account.image} price={account.price} seller={account.seller} heroes={account.heroes} trophies={account.trophies} description={account.description} />)}
        </div>
      </div>
    </div>;
};
export default Home;