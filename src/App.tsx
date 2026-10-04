/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CmsProvider } from './context/CmsContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { VisionTracks } from './components/VisionTracks';
import { Schedule } from './components/Schedule';
import { Staff } from './components/Staff';
import { Gallery } from './components/Gallery';
import { Alumni } from './components/Alumni';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Toast } from './components/Toast';

function MainAppContent() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return path.includes('admin') || hash.includes('admin') || search.includes('admin');
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const shouldBeAdmin = path.includes('admin') || hash.includes('admin') || search.includes('admin');
      setIsAdmin(shouldBeAdmin);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Initial check
    handleUrlChange();

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleBackToSite = () => {
    // If URL had hash or query or path with admin, reset cleanly
    if (window.location.hash.toLowerCase().includes('admin')) {
      window.location.hash = '';
    }
    if (window.location.pathname.toLowerCase().includes('admin') || window.location.search.toLowerCase().includes('admin')) {
      window.history.pushState(null, '', window.location.pathname.replace(/\/admin\/?/i, '/') || '/');
    }
    setIsAdmin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isAdmin) {
    return (
      <>
        <AdminDashboard onBackToSite={handleBackToSite} />
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Vision & 4 Academic/Spiritual Tracks */}
        <VisionTracks />

        {/* Daily Schedule (סדר היום) */}
        <Schedule />

        {/* Roshei Yeshiva & Educators */}
        <Staff />

        {/* Visual Gallery with Lightbox */}
        <Gallery />

        {/* Alumni Voices */}
        <Alumni />

        {/* Registration Inquiry Form & Contact */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Real-time Toast Notifications */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <MainAppContent />
    </CmsProvider>
  );
}
