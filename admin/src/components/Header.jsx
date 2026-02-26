import { Bell } from "lucide-react";

const Header = () => {
  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      
      {/* Search */}
      <div className="w-96">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        
        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={22} />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center rounded-full font-bold">
            AD
          </div>
          <div className="text-sm">
            <div className="font-semibold">Admin User</div>
            <div className="text-gray-500 text-xs">Super Admin</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;