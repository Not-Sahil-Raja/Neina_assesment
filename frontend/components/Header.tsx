"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Book A Table", href: "/reservation" },
  { name: "Your Bookings", href: "/bookings" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className=" md:w-fit bg-white/85 backdrop-blur-sm shadow-md border border-stone-300 font-halenoir fixed  top-0 left-0 right-0 md:left-4 md:right-4 z-30 md:top-4  md:rounded-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center mr-1 xl:mr-3">
            <Link href="/" className="text-2xl font-semibold text-gray-800">
              Hot Plate
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center px-3 py-2 rounded text-sm font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-stone-300 text-gray-900"
                    : "text-gray-700 hover:bg-stone-200"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                pathname === item.href
                  ? "bg-stone-300 text-gray-900"
                  : "text-gray-700 hover:bg-stone-200"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
