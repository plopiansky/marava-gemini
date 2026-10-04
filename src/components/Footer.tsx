import React from 'react';
import { Logo } from './Logo';
import { useCms } from '../context/CmsContext';
import { MapPin, Phone, Mail, Edit3, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { content, openDrawer, toggleEditMode, isEditMode } = useCms();
  const { meta } = content;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'אודות הישיבה', href: '#about' },
    { name: 'עמודי התווך', href: '#vision' },
    { name: 'סדר היום', href: '#schedule' },
    { name: 'צוות ורבנים', href: '#staff' },
    { name: 'גלריית תמונות', href: '#gallery' },
    { name: 'בוגרים מעידים', href: '#alumni' },
    { name: 'צור קשר והרשמה', href: '#contact' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="light" size="lg" onClick={scrollToTop} />
            
            <p className="text-sm text-slate-400 max-w-md leading-relaxed pt-2">
              ישיבה תיכונית חרדית בנשיאות הרב ברוך צ'ייט שליט"א.
              שילוב של גדלות בתורה, עמל ויראת שמיים עם תעודת בגרות מלאה ומצוינות אישית ביישוב מתתיהו.
            </p>

            <div className="pt-2 text-xs text-slate-500">
              מכון רובין לחינוך ולהוראה · נוסד {meta.foundedYear}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-torah">
              ניווט מהיר
            </h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-torah">
              יצירת קשר
            </h4>

            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{meta.address}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span dir="ltr">{meta.phone}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span dir="ltr">{meta.email}</span>
            </div>

            {/* CMS Admin Link */}
            <div className="pt-4">
              <a
                href="#admin"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 bg-slate-900 hover:bg-slate-800 px-3 py-2 rounded-lg border border-slate-800 transition-colors"
                title="כניסה לפאנל הניהול (/admin או #admin)"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>כניסה לפאנל ניהול (ADMIN)</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} ישיבת מערבא - מכון רובין. כל הזכויות שמורות.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>לראש העמוד</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
