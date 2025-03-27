import React from 'react';
import { Link } from 'react-router-dom';
const Footer: React.FC = () => {
  return <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Clash Marketplace</h3>
            <p className="text-gray-400">
              The safest place to buy and sell Clash of Clans accounts.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-400 hover:text-white">
                  Sell Account
                </Link>
              </li>
              <li>
                <Link to="/buyer-posting" className="text-gray-400 hover:text-white">
                  Buyer Posts
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-400 hover:text-white">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@clashmarket.com</li>
              <li>Discord: ClashMarket#1234</li>
              <li>Telegram: @ClashMarket</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Clash Marketplace. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;