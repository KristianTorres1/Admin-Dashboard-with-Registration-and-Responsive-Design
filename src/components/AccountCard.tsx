import React from 'react';
interface AccountCardProps {
  id: string;
  level: string;
  image: string;
  price: number;
  seller: string;
  heroes: string;
  trophies: string;
  description: string;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}
const AccountCard: React.FC<AccountCardProps> = ({
  id,
  level,
  image,
  price,
  seller,
  heroes,
  trophies,
  description,
  onDelete,
  isAdmin = false
}) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={`TH${level} Account`} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded">
          TH {level}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold">TH{level} Account</h3>
          <span className="text-green-600 font-semibold">${price}</span>
        </div>
        <p className="text-sm text-gray-600 mb-2">Seller: {seller}</p>
        <div className="bg-gray-100 p-2 rounded mb-2">
          <p className="text-sm">Heroes: {heroes}</p>
          <p className="text-sm">Trophies: {trophies}</p>
        </div>
        <p className="text-sm mb-4">{description}</p>
        <div className="flex justify-between">
          <button className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700">
            Contact
          </button>
          {isAdmin && <button className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700" onClick={() => onDelete && onDelete(id)}>
              Delete
            </button>}
        </div>
      </div>
    </div>;
};
export default AccountCard;