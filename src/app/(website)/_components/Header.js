"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", route: "/" },
    { name: "Events", route: "/events" },
    { name: "About Us", route: "/about" },
    { name: "Login", route: "/login" },
    { name: "Register", route: "/register" },
  ];

  const handleNavigation = (route) => {
    window.location.href = route;
  };

  return (
    <div className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div
            className="relative w-[120px] cursor-pointer"
            onClick={() => {
              handleNavigation("/");
            }}
          >
            <img
              src="/logo.png"
              alt="mahotshav logo"
              className="w-auto h-20 transform transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                className="relative font-medium text-black hover:text-[#A15842] transition-colors duration-300 py-2
                          after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#A15842] 
                          after:left-0 after:bottom-0 after:transition-all after:duration-300
                          hover:after:w-full text-lg"
                href={item.route}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X
                size={28}
                className="text-[#A15842] transition-all duration-300"
              />
            ) : (
              <Menu
                size={28}
                className="text-[#A15842] transition-all duration-300"
              />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-2 space-y-1 flex flex-col items-end">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className="text-right px-4 py-3 rounded-lg font-medium text-black w-auto
                          hover:bg-gray-50 hover:text-[#A15842] transition-all duration-200
                          transform hover:translate-x-2 text-lg"
                onClick={() => {
                  setMenuOpen(false);
                  handleNavigation(item.route);
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
