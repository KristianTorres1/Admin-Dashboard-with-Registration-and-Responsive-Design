import React from 'react';
import { BellIcon } from 'lucide-react';
interface NotificationBadgeProps {
  count: number;
  onClick: () => void;
}
const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  onClick
}) => {
  return <button onClick={onClick} className="relative p-2 hover:bg-blue-700 rounded transition-colors">
      <BellIcon size={20} />
      {count > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {count > 99 ? '99+' : count}
        </span>}
    </button>;
};
export default NotificationBadge;