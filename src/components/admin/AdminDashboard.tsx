import React, { useState } from 'react';
import {
  Layout,
  FileText,
  Clock,
  Compass,
  Users,
  Image as ImageIcon,
  PhoneCall,
  Inbox,
  Sliders,
  ArrowRight,
  ExternalLink,
  Download,
  Upload,
  Plus,
  Trash2,
  CheckCircle,
  RotateCcw,
  Sparkles,
  Search,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { Logo } from '../Logo';
import { ScheduleItem, GalleryItem, StaffMember, LeadSubmission } from '../../types/content';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const {
    content,
    updateSection,
    resetToDefaults,
    exportContentJson,
    importContentJson,
    leads,
    deleteLead,
    updateLeadStatus,
    showToast
  } = useCms();

  const [activeTab, setActiveTab] = useState<
    'hero' | 'about' | 'schedule' | 'vision' | 'staff' | 'gallery' | 'alumni' | 'contact' | 'leads' | 'settings'
  >('hero');

  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  interface AdminTabItem {
    id: 'hero' | 'about' | 'schedule' | 'vision' | 'staff' | 'gallery' | 'alumni' | 'contact' | 'leads' | 'settings';
    label: string;
    icon: any;
    badge?: number;
  }

  const tabs: AdminTabItem[] = [
    { id: 'hero', label: 'מקטע ראשי ונתונים', icon: Layout },
    { id: 'about', label: 'אודות הישיבה', icon: FileText },
    { id: 'schedule', label: 'סדר היום', icon: Clock },
    { id: 'vision', label: 'עמודי התווך', icon: Compass },
    { id: 'staff', label: 'רבנים וצוות', icon: Users },
    { id: 'gallery', label: 'גלריית תמונות', icon: ImageIcon },
    { id: 'alumni', label: 'בוגרים מעידים', icon: Users },
    { id: 'contact', label: 'פרטי קשר ומזכירות', icon: PhoneCall },
    { id: 'leads', label: 'פניות ורישום תלמידים', icon: Inbox, badge: newLeadsCount > 0 ? newLeadsCount : undefined },
    { id: 'settings', label: 'גיבוי ושחזור', icon: Sliders },
  ];

  const handleExportCsvLeads = () => {
    if (leads.length === 0) {
      showToast('אין פניות לייצוא');
      return;
    }
    const headers = 'שם מלא,טלפון,דוא"ל,כיתה,שם הורה,הערות,תאריך,סטטוס\n';
    const rows = leads
      .map(
        (l) =>
          `"${l.fullName}","${l.phone}","${l.email || ''}","${l.studentGrade}","${l.parentName || ''}","${(
            l.notes || ''
          ).replace(/"/g, '""')}","${l.submittedAt}","${l.status}"`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `maarava-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('קובץ הפניות יוצא בהצלחה כ-CSV');
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.fullName.includes(leadSearchQuery) ||
      l.phone.includes(leadSearchQuery) ||
      (l.notes && l.notes.includes(leadSearchQuery))
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans" dir="rtl">
      
      {/* Top Admin Navbar */}
      <header className="bg-slate-900 text-white px-4 sm:px-8 py-3.5 border-b border-slate-800 shadow-md sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Logo variant="light" size="sm" />
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold text-[11px] font-mono tracking-wider">
              ADMIN
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/60">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>שמירה אוטומטית פעילה</span>
          </div>

          <button
            onClick={exportContentJson}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            title="הורדת גיבוי JSON"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>הורד גיבוי</span>
          </button>

          <button
            onClick={onBackToSite}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>חזרה לאתר הראשי</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-3 shrink-0 h-fit lg:sticky lg:top-20">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-2 mb-1">
            תפריט ניהול
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-950 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>

                  {tab.badge && (
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-100 px-3 text-[11px] text-slate-400 leading-relaxed">
            כתובת גישה ישירה לפאנל: <br />
            <code className="text-blue-900 font-mono font-bold">/admin</code> או <code className="text-blue-900 font-mono font-bold">#admin</code>
          </div>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
          
          {/* TAB: HERO */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold font-torah text-blue-950">
                  עריכת מקטע ראשי (Hero)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  הכותרות, הטקסטים וכפתורי הפעולה בראש דף הבית
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  תגית עליונה (Badge)
                </label>
                <input
                  type="text"
                  value={content.hero.badge}
                  onChange={(e) => updateSection('hero', { badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    כותרת ראשית (שורה 1)
                  </label>
                  <input
                    type="text"
                    value={content.hero.heading}
                    onChange={(e) => updateSection('hero', { heading: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-hidden font-torah font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    טקסט מודגש מוזהב (שורה 2)
                  </label>
                  <input
                    type="text"
                    value={content.hero.highlightedText}
                    onChange={(e) => updateSection('hero', { highlightedText: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-hidden font-torah font-bold text-amber-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  פסקת תיאור הישיבה
                </label>
                <textarea
                  rows={4}
                  value={content.hero.description}
                  onChange={(e) => updateSection('hero', { description: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-hidden resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    כיתוב כפתור ראשי
                  </label>
                  <input
                    type="text"
                    value={content.hero.primaryCtaText}
                    onChange={(e) => updateSection('hero', { primaryCtaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    כיתוב כפתור משני
                  </label>
                  <input
                    type="text"
                    value={content.hero.secondaryCtaText}
                    onChange={(e) => updateSection('hero', { secondaryCtaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* 4 Stats */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="font-bold text-sm text-slate-900 mb-3">
                  כרטיסיות נתוני מפתח (Stats Strip)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {content.hero.stats.map((st, idx) => (
                    <div key={st.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                      <div className="flex gap-2">
                        <div className="w-1/3">
                          <label className="block text-[11px] text-slate-500 mb-0.5">ערך</label>
                          <input
                            type="text"
                            value={st.value}
                            onChange={(e) => {
                              const newStats = [...content.hero.stats];
                              newStats[idx].value = e.target.value;
                              updateSection('hero', { stats: newStats });
                            }}
                            className="w-full px-2.5 py-1.5 text-sm border rounded-lg bg-white font-bold text-blue-900"
                          />
                        </div>
                        <div className="w-2/3">
                          <label className="block text-[11px] text-slate-500 mb-0.5">כותרת</label>
                          <input
                            type="text"
                            value={st.label}
                            onChange={(e) => {
                              const newStats = [...content.hero.stats];
                              newStats[idx].label = e.target.value;
                              updateSection('hero', { stats: newStats });
                            }}
                            className="w-full px-2.5 py-1.5 text-sm border rounded-lg bg-white font-semibold"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-0.5">הסבר קצר</label>
                        <input
                          type="text"
                          value={st.subtext || ''}
                          onChange={(e) => {
                            const newStats = [...content.hero.stats];
                            newStats[idx].subtext = e.target.value;
                            updateSection('hero', { stats: newStats });
                          }}
                          className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white text-slate-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold font-torah text-blue-950">
                  עריכת אודות הישיבה
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  הסיפור ההיסטורי, ציטוט ראש הישיבה ויתרונות הקמפוס
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  כותרת המקטע
                </label>
                <input
                  type="text"
                  value={content.about.title}
                  onChange={(e) => updateSection('about', { title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-slate-50 font-torah font-bold text-blue-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  פסקה ראשונה
                </label>
                <textarea
                  rows={3}
                  value={content.about.paragraph1}
                  onChange={(e) => updateSection('about', { paragraph1: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-slate-50 resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  פסקה שנייה
                </label>
                <textarea
                  rows={3}
                  value={content.about.paragraph2}
                  onChange={(e) => updateSection('about', { paragraph2: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border rounded-xl bg-slate-50 resize-none leading-relaxed"
                />
              </div>

              {/* Quote */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-3">
                <label className="block text-xs font-bold text-amber-900">
                  ציטוט מאת ראש הישיבה
                </label>
                <textarea
                  rows={2}
                  value={content.about.quote}
                  onChange={(e) => updateSection('about', { quote: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-xl bg-white font-torah font-semibold text-blue-900"
                />
                <input
                  type="text"
                  value={content.about.quoteAuthor}
                  onChange={(e) => updateSection('about', { quoteAuthor: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg bg-white"
                  placeholder="שם הדובר"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    קישור לתמונת הקמפוס (URL)
                  </label>
                  <input
                    type="text"
                    value={content.about.imageUrl}
                    onChange={(e) => updateSection('about', { imageUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-xl bg-slate-50 font-mono text-slate-600"
                  />
                </div>

                <div className="flex gap-3">
                  <div className="w-1/3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">שנות וותק</label>
                    <input
                      type="text"
                      value={content.about.yearsBadgeNumber}
                      onChange={(e) => updateSection('about', { yearsBadgeNumber: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-xl bg-slate-50 font-bold"
                    />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">כיתוב תגית</label>
                    <input
                      type="text"
                      value={content.about.yearsBadgeLabel}
                      onChange={(e) => updateSection('about', { yearsBadgeLabel: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-xl bg-slate-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-torah text-blue-950">
                    ניהול סדר היום במערבא
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    לוח הזמנים היומי של תלמידי הישיבה
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newItem: ScheduleItem = {
                      id: 's-' + Date.now(),
                      startTime: '15:00',
                      endTime: '16:00',
                      title: 'פעילות חדשה',
                      description: 'פירוט הפעילות...',
                      category: 'kodesh',
                      highlight: false,
                    };
                    updateSection('schedule', {
                      items: [...content.schedule.items, newItem],
                    });
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>הוסף שעה ללוח</span>
                </button>
              </div>

              <div className="space-y-4">
                {content.schedule.items.map((item, index) => (
                  <div key={item.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item.startTime}
                          onChange={(e) => {
                            const newItems = [...content.schedule.items];
                            newItems[index].startTime = e.target.value;
                            updateSection('schedule', { items: newItems });
                          }}
                          placeholder="08:00"
                          className="w-20 px-2 py-1.5 text-xs border rounded-lg bg-white text-center font-mono font-bold"
                        />
                        <span className="text-slate-400">-</span>
                        <input
                          type="text"
                          value={item.endTime}
                          onChange={(e) => {
                            const newItems = [...content.schedule.items];
                            newItems[index].endTime = e.target.value;
                            updateSection('schedule', { items: newItems });
                          }}
                          placeholder="09:00"
                          className="w-20 px-2 py-1.5 text-xs border rounded-lg bg-white text-center font-mono font-bold"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={item.category}
                          onChange={(e) => {
                            const newItems = [...content.schedule.items];
                            newItems[index].category = e.target.value as any;
                            updateSection('schedule', { items: newItems });
                          }}
                          className="text-xs px-3 py-1.5 border rounded-lg bg-white font-medium"
                        >
                          <option value="kodesh">לימודי קודש</option>
                          <option value="chol">בגרות ומדעים</option>
                          <option value="break">ארוחה ומנוחה</option>
                          <option value="activities">פנאי והווי</option>
                        </select>

                        <button
                          onClick={() => {
                            const newItems = content.schedule.items.filter((_, i) => i !== index);
                            updateSection('schedule', { items: newItems });
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="מחק שורה"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...content.schedule.items];
                        newItems[index].title = e.target.value;
                        updateSection('schedule', { items: newItems });
                      }}
                      placeholder="כותרת הפעילות"
                      className="w-full px-3 py-2 text-sm font-bold border rounded-lg bg-white font-torah"
                    />

                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...content.schedule.items];
                        newItems[index].description = e.target.value;
                        updateSection('schedule', { items: newItems });
                      }}
                      placeholder="תיאור הפעילות..."
                      className="w-full px-3 py-1.5 text-xs border rounded-lg bg-white resize-none"
                    />

                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.highlight || false}
                        onChange={(e) => {
                          const newItems = [...content.schedule.items];
                          newItems[index].highlight = e.target.checked;
                          updateSection('schedule', { items: newItems });
                        }}
                        className="rounded text-amber-600"
                      />
                      <span>הדגש פריט זה בלוח הזמנים באתר</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: VISION */}
          {activeTab === 'vision' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold font-torah text-blue-950">
                  עריכת עמודי התווך של הישיבה
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  המסלולים התורניים, המדעיים, המוזיקליים והפנימייתיים
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.vision.tracks.map((track, idx) => (
                  <div key={track.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="text-xs font-bold text-amber-600 uppercase">
                      מסלול #{idx + 1}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">כותרת המסלול</label>
                      <input
                        type="text"
                        value={track.title}
                        onChange={(e) => {
                          const newTracks = [...content.vision.tracks];
                          newTracks[idx].title = e.target.value;
                          updateSection('vision', { tracks: newTracks });
                        }}
                        className="w-full px-3 py-2 text-sm font-bold border rounded-lg bg-white font-torah text-blue-950"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">תיאור</label>
                      <textarea
                        rows={3}
                        value={track.description}
                        onChange={(e) => {
                          const newTracks = [...content.vision.tracks];
                          newTracks[idx].description = e.target.value;
                          updateSection('vision', { tracks: newTracks });
                        }}
                        className="w-full px-3 py-2 text-xs border rounded-lg bg-white resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: STAFF */}
          {activeTab === 'staff' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-torah text-blue-950">
                    צוות הרבנים וההנהלה
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    הדמויות החינוכיות המובילות את הישיבה
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newMember: StaffMember = {
                      id: 'st-' + Date.now(),
                      name: 'איש צוות חדש',
                      role: 'תפקיד בישיבה',
                      bio: 'פירוט קורות חיים והשפעה חינוכית...',
                      imageUrl:
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
                    };
                    updateSection('staff', {
                      members: [...content.staff.members, newMember],
                    });
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>הוסף רב / מורה</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.staff.members.map((member, idx) => (
                  <div key={member.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm font-torah text-blue-950">
                        {member.name}
                      </span>
                      <button
                        onClick={() => {
                          const newMembers = content.staff.members.filter((_, i) => i !== idx);
                          updateSection('staff', { members: newMembers });
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => {
                          const newMembers = [...content.staff.members];
                          newMembers[idx].name = e.target.value;
                          updateSection('staff', { members: newMembers });
                        }}
                        placeholder="שם הרב"
                        className="px-2.5 py-1.5 text-xs border rounded-lg bg-white font-bold"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => {
                          const newMembers = [...content.staff.members];
                          newMembers[idx].role = e.target.value;
                          updateSection('staff', { members: newMembers });
                        }}
                        placeholder="תפקיד"
                        className="px-2.5 py-1.5 text-xs border rounded-lg bg-white"
                      />
                    </div>

                    <input
                      type="text"
                      value={member.imageUrl}
                      onChange={(e) => {
                        const newMembers = [...content.staff.members];
                        newMembers[idx].imageUrl = e.target.value;
                        updateSection('staff', { members: newMembers });
                      }}
                      placeholder="כתובת תמונה URL"
                      className="w-full px-2.5 py-1.5 text-xs font-mono border rounded-lg bg-white text-slate-500"
                    />

                    <textarea
                      rows={2}
                      value={member.bio}
                      onChange={(e) => {
                        const newMembers = [...content.staff.members];
                        newMembers[idx].bio = e.target.value;
                        updateSection('staff', { members: newMembers });
                      }}
                      placeholder="תיאור קצר..."
                      className="w-full px-2.5 py-1.5 text-xs border rounded-lg bg-white resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-torah text-blue-950">
                    ניהול גלריית התמונות
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    תמונות מבית המדרש, השיעורים, הפנימייה והקמפוס
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newItem: GalleryItem = {
                      id: 'g-' + Date.now(),
                      title: 'תמונה חדשה',
                      category: 'campus-life',
                      imageUrl:
                        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
                      spanCol: false,
                    };
                    updateSection('gallery', {
                      items: [...content.gallery.items, newItem],
                    });
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>הוסף תמונה לגלריה</span>
                </button>
              </div>

              <div className="space-y-3">
                {content.gallery.items.map((item, idx) => (
                  <div key={item.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-200 border"
                    />
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const newItems = [...content.gallery.items];
                          newItems[idx].title = e.target.value;
                          updateSection('gallery', { items: newItems });
                        }}
                        className="w-full px-2.5 py-1 text-xs border rounded-lg bg-white font-bold"
                      />
                      <div className="flex items-center gap-2">
                        <select
                          value={item.category}
                          onChange={(e) => {
                            const newItems = [...content.gallery.items];
                            newItems[idx].category = e.target.value as any;
                            updateSection('gallery', { items: newItems });
                          }}
                          className="text-xs px-2.5 py-1 border rounded-lg bg-white"
                        >
                          <option value="bet-midrash">בית מדרש</option>
                          <option value="studies">כיתות ומדעים</option>
                          <option value="music">מוזיקה ושירה</option>
                          <option value="campus-life">קמפוס וטיולים</option>
                        </select>
                        <input
                          type="text"
                          value={item.imageUrl}
                          onChange={(e) => {
                            const newItems = [...content.gallery.items];
                            newItems[idx].imageUrl = e.target.value;
                            updateSection('gallery', { items: newItems });
                          }}
                          placeholder="כתובת תמונה URL"
                          className="flex-1 px-2.5 py-1 text-[11px] font-mono border rounded-lg bg-white text-slate-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newItems = content.gallery.items.filter((_, i) => i !== idx);
                        updateSection('gallery', { items: newItems });
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ALUMNI */}
          {activeTab === 'alumni' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold font-torah text-blue-950">
                  עריכת בוגרים מעידים
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  ציטוטי בוגרים והצלחתם
                </p>
              </div>

              <div className="space-y-4">
                {content.alumni.testimonials.map((test, idx) => (
                  <div key={test.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={test.name}
                        onChange={(e) => {
                          const newAlumni = [...content.alumni.testimonials];
                          newAlumni[idx].name = e.target.value;
                          updateSection('alumni', { testimonials: newAlumni });
                        }}
                        className="px-3 py-1.5 text-xs border rounded-lg bg-white font-bold"
                        placeholder="שם הבוגר"
                      />
                      <input
                        type="text"
                        value={test.graduationYear}
                        onChange={(e) => {
                          const newAlumni = [...content.alumni.testimonials];
                          newAlumni[idx].graduationYear = e.target.value;
                          updateSection('alumni', { testimonials: newAlumni });
                        }}
                        className="px-3 py-1.5 text-xs border rounded-lg bg-white"
                        placeholder="מחזור ושנה"
                      />
                    </div>
                    <input
                      type="text"
                      value={test.currentRole}
                      onChange={(e) => {
                        const newAlumni = [...content.alumni.testimonials];
                        newAlumni[idx].currentRole = e.target.value;
                        updateSection('alumni', { testimonials: newAlumni });
                      }}
                      className="w-full px-3 py-1.5 text-xs border rounded-lg bg-white"
                      placeholder="עיסוק נוכחי"
                    />
                    <textarea
                      rows={3}
                      value={test.quote}
                      onChange={(e) => {
                        const newAlumni = [...content.alumni.testimonials];
                        newAlumni[idx].quote = e.target.value;
                        updateSection('alumni', { testimonials: newAlumni });
                      }}
                      className="w-full px-3 py-1.5 text-xs border rounded-lg bg-white resize-none"
                      placeholder="ציטוט..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACT */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold font-torah text-blue-950">
                  פרטי יצירת קשר ומזכירות
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  פרטי ההתקשרות המוצגים באתר ובטופס הרישום
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">טלפון מזכירות</label>
                  <input
                    type="text"
                    value={content.meta.phone}
                    onChange={(e) => {
                      updateSection('meta', { phone: e.target.value });
                      updateSection('contact', { phoneDetails: e.target.value });
                    }}
                    className="w-full px-3.5 py-2 text-sm border rounded-xl bg-slate-50 font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">דואר אלקטרוני</label>
                  <input
                    type="text"
                    value={content.meta.email}
                    onChange={(e) => {
                      updateSection('meta', { email: e.target.value });
                      updateSection('contact', { emailDetails: e.target.value });
                    }}
                    className="w-full px-3.5 py-2 text-sm border rounded-xl bg-slate-50 font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">כתובת הקמפוס</label>
                <input
                  type="text"
                  value={content.meta.address}
                  onChange={(e) => {
                    updateSection('meta', { address: e.target.value });
                    updateSection('contact', { addressDetails: e.target.value });
                  }}
                  className="w-full px-3.5 py-2 text-sm border rounded-xl bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">שעות קבלת קהל</label>
                <input
                  type="text"
                  value={content.contact.visitingHours}
                  onChange={(e) => updateSection('contact', { visitingHours: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border rounded-xl bg-slate-50"
                />
              </div>
            </div>
          )}

          {/* TAB: LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold font-torah text-blue-950">
                    פניות ורישום תלמידים ({leads.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    כל הפניות שנשלחו דרך טופס הרישום באתר
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCsvLeads}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ייצא ל-CSV (אקסל)</span>
                  </button>
                </div>
              </div>

              {/* Search filter */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={leadSearchQuery}
                  onChange={(e) => setLeadSearchQuery(e.target.value)}
                  placeholder="חיפוש לפי שם תלמיד, טלפון או הערות..."
                  className="w-full pr-10 pl-4 py-2.5 text-xs sm:text-sm border rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-900 outline-hidden"
                />
              </div>

              {filteredLeads.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Inbox className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">לא נמצאו פניות תואמות.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        lead.status === 'new'
                          ? 'bg-amber-50/80 border-amber-200 shadow-xs'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-base font-torah">
                              {lead.fullName}
                            </span>
                            {lead.status === 'new' && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
                                חדש
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            כיתה נוכחית: כיתה {lead.studentGrade} · התקבל ב: {lead.submittedAt}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                            className="text-xs px-3 py-1.5 rounded-xl border bg-white font-semibold cursor-pointer"
                          >
                            <option value="new">חדש (טרם טופל)</option>
                            <option value="contacted">נוצר קשר ראשוני</option>
                            <option value="registered">נרשם לישיבה בהצלחה</option>
                            <option value="archived">הועבר לארכיון</option>
                          </select>

                          <button
                            onClick={() => {
                              if (window.confirm(`האם למחוק את פנייתו של ${lead.fullName}?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="מחק פנייה"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white/80 p-3 rounded-xl border border-slate-200/60">
                        <div>
                          <strong className="text-slate-500">טלפון:</strong>{' '}
                          <a href={`tel:${lead.phone}`} className="text-blue-900 font-bold font-mono hover:underline" dir="ltr">
                            {lead.phone}
                          </a>
                        </div>
                        {lead.email && (
                          <div>
                            <strong className="text-slate-500">אימייל:</strong> {lead.email}
                          </div>
                        )}
                        {lead.parentName && (
                          <div>
                            <strong className="text-slate-500">הורה:</strong> {lead.parentName}
                          </div>
                        )}
                      </div>

                      {lead.notes && (
                        <div className="mt-2.5 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                          <span className="font-semibold text-slate-700">הערות/בקשות:</span> {lead.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold font-torah text-blue-950">
                  גיבוי ושחזור נתוני אתר
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  הורדת קובץ גיבוי של כל התוכן או שחזור
                </p>
              </div>

              {/* Export */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-sm text-slate-900">
                  ייצוא נתונים מלא (Export JSON)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  הורדת קובץ המכיל את כל הגדרות האתר, הטקסטים, לוח הזמנים, הגלריה ופרטי הישיבה.
                </p>
                <button
                  onClick={exportContentJson}
                  className="mt-2 flex items-center gap-2 px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>הורד קובץ גיבוי JSON</span>
                </button>
              </div>

              {/* Import */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-sm text-slate-900">
                  שחזור מקובץ גיבוי (Import JSON)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  הדבק תוכן קובץ JSON שיוצא בעבר לעדכון מיידי של כל תוכן האתר.
                </p>

                {showImportBox ? (
                  <div className="space-y-3 pt-2">
                    <textarea
                      rows={6}
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      placeholder="הדבק כאן את תוכן קובץ ה-JSON..."
                      className="w-full p-3 text-xs font-mono border rounded-xl bg-white resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (importContentJson(importJsonText)) {
                            setShowImportBox(false);
                            setImportJsonText('');
                          }
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        אישור ושחזור נתונים
                      </button>
                      <button
                        onClick={() => setShowImportBox(false)}
                        className="px-3 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        ביטול
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowImportBox(true)}
                    className="mt-2 flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>טען תוכן מקובץ גיבוי</span>
                  </button>
                )}
              </div>

              {/* Reset to Defaults */}
              <div className="p-5 bg-red-50/70 rounded-2xl border border-red-200 space-y-2">
                <h3 className="font-bold text-sm text-red-900">
                  איפוס לברירת מחדל
                </h3>
                <p className="text-xs text-red-700 leading-relaxed">
                  פעולה זו תמחק את כל העריכות ותחזיר את האתר לטקסטים המקוריים של ישיבת מערבא.
                </p>
                <button
                  onClick={() => {
                    if (window.confirm('האם אתה בטוח שברצונך לאפס את כל תוכן האתר לברירת המחדל?')) {
                      resetToDefaults();
                    }
                  }}
                  className="mt-2 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>איפוס לברירת מחדל מקורית</span>
                </button>
              </div>

            </div>
          )}

        </main>

      </div>
    </div>
  );
};
