import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Edit3, Settings, ShieldCheck, Inbox } from 'lucide-react';
import { Logo } from './Logo';
import { useCms } from '../context/CmsContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content, isEditMode, toggleEditMode, openDrawer, leads } = useCms();
  const { meta } = content;

  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'אודות', href: '#about' },
    { name: 'עמודי התווך', href: '#vision' },
    { name: 'סדר היום', href: '#schedule' },
    { name: 'צוות ורבנים', href: '#staff' },
    { name: 'גלריה', href: '#gallery' },
    { name: 'בוגרים', href: '#alumni' },
    { name: 'צור קשר', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Logo
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors relative py-1 after:absolute after:bottom-0 after:right-0 after:left-0 after:h-0.5 after:bg-amber-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Quick Phone Call */}
            <a
              href={`tel:${meta.phone}`}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="חיוג למזכירות הישיבה"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span dir="ltr" className="font-mono text-xs">{meta.phone}</span>
            </a>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              רישום לשנה הבאה
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleEditMode}
              className={`p-2 rounded-lg text-xs font-bold ${
                isEditMode ? 'bg-amber-500 text-slate-900' : 'bg-slate-100 text-slate-700'
              }`}
              title="עריכת תוכן"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-900 focus:outline-none"
              aria-label="פתח תפריט"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-blue-50 hover:text-blue-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="#admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                כניסה לפאנל ניהול (Admin)
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center py-3 px-4 rounded-xl text-sm font-bold bg-amber-600 text-white shadow-md"
              >
                רישום לשנת הלימודים הבאה
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
