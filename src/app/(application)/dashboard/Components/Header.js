import { Bell, Settings } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-end bg-white p-4 shadow-md">
      <div className="flex items-center space-x-4 gap-4">
        {/* Notification Icon */}
        <button className="relative">
          <span className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0"></span>
          <Bell />
        </button>

        {/* Profile Section */}
        <div className="flex items-center space-x-2">
          <img
            src="/path/to/profile-pic.jpg" // Replace with the actual path to the user's profile image
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-700 font-medium">Rameshwor B.</p>
            <Link href="/dashboard/profile" className="text-sm text-blue-500">
              View profile
            </Link>
          </div>
        </div>
        <div className="hover:cursor-pointer">
          <Settings />
        </div>
      </div>
    </header>
  );
};

export default Header;
