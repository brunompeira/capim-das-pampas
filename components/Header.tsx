'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import CartButton from './CartButton';
import { Product } from '@/types';

interface HeaderProps {
  favoriteProducts?: Product[];
  onRemoveFavorite?: (productId: string) => void;
}

export default function Header({ favoriteProducts = [], onRemoveFavorite = () => {} }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { adminSettings, isLoading } = useAdminSettings();

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Contacto', href: '/contato' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/images/logo/logo.jpg" 
                alt={`${siteConfig.name} Logo`}
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & Cart */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoading ? (
              <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
            ) : (
              <a
                href={`tel:${adminSettings.phone}`}
                className="flex items-center text-sm text-gray-600 hover:text-primary-600"
              >
                <Phone className="w-4 h-4 mr-1" />
                {adminSettings.phone}
              </a>
            )}
            
            {/* Cart Button */}
            <CartButton 
              favoriteProducts={favoriteProducts}
              onRemoveFavorite={onRemoveFavorite}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <CartButton 
              favoriteProducts={favoriteProducts}
              onRemoveFavorite={onRemoveFavorite}
            />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isLoading ? (
                <div className="px-3 py-2">
                  <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
                </div>
              ) : (
                <a
                  href={`tel:${adminSettings.phone}`}
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  {adminSettings.phone}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
