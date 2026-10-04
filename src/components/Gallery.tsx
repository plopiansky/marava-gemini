import React, { useState } from 'react';
import { Eye, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditTrigger } from './cms/EditTrigger';
import { GalleryItem } from '../types/content';

export const Gallery: React.FC = () => {
  const { content } = useCms();
  const { gallery } = content;
  const [activeCategory, setActiveCategory] = useState<'all' | GalleryItem['category']>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories: Array<{ key: 'all' | GalleryItem['category']; label: string }> = [
    { key: 'all', label: 'הכל' },
    { key: 'bet-midrash', label: 'בית המדרש' },
    { key: 'studies', label: 'כיתות ומדעים' },
    { key: 'music', label: 'מוזיקה ושירה' },
    { key: 'campus-life', label: 'קמפוס וטיולים' },
  ];

  const filteredItems = activeCategory === 'all'
    ? gallery.items
    : gallery.items.filter(item => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-right">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
              {gallery.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-torah text-blue-950">
              {gallery.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              {gallery.subtitle}
            </p>
          </div>
          <EditTrigger sectionKey="gallery" label="עריכת גלריית תמונות" />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-blue-950 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-900 aspect-4/3 ${
                item.spanCol ? 'sm:col-span-2 aspect-auto min-h-[260px]' : ''
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 via-blue-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                      {categories.find(c => c.key === item.category)?.label || 'תמונה'}
                    </span>
                    <h3 className="text-lg font-bold font-torah">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="סגור תמונה"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev/Next Navigation */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightbox();
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                aria-label="תמונה קודמת"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightbox();
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
                aria-label="תמונה הבאה"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Image in Lightbox */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold font-torah">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                תמונה {lightboxIndex + 1} מתוך {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
