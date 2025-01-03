import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white font-halenoir">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Hot Plate</h3>
            <p className="text-stone-400">
              Sizzling Flavors, Unforgettable Moments
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-white hover:text-yellow-500 transition-colors"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-yellow-500 transition-colors"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="#"
                className="text-white hover:text-yellow-500 transition-colors"
              >
                <Twitter size={24} />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/reservation"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Book A Table
                </Link>
              </li>
              <li>
                <Link
                  href="/bookings"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Your Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Menu
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <p className="text-stone-400">123 Bidhan Sarani</p>
            <p className="text-stone-400">Kolkata, Pin 700085</p>
            <p className="text-stone-400">Phone: (+91) 456-7890</p>
            <p className="text-stone-400">Email: info@hotplate.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-stone-800 text-center text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} Hot Plate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
