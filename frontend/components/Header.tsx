"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Book A Table", href: "/reservation" },
  { name: "Your Bookings", href: "/bookings" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white/85 backdrop-blur-sm shadow-md font-halenoir fixed top-4 z-30 rounded right-5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                Hot Plate
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center h-fit my-auto rounded px-2 py-1  text-sm font-medium transition-all duration-300 ${
                    pathname === item.href ? " bg-stone-300" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
