import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, LeadSubmission } from '../types/content';
import { initialSiteContent, sampleLeads } from '../data/defaultContent';

const STORAGE_KEY_CONTENT = 'maarava_cms_content_v1';
const STORAGE_KEY_LEADS = 'maarava_cms_leads_v1';

interface CmsContextType {
  content: SiteContent;
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (val: boolean) => void;
  activeDrawerSection: keyof SiteContent | 'leads' | 'settings' | null;
  openDrawer: (section?: keyof SiteContent | 'leads' | 'settings') => void;
  closeDrawer: () => void;
  updateSection: <K extends keyof SiteContent>(section: K, updates: Partial<SiteContent[K]>) => void;
  updateContent: (newContent: SiteContent) => void;
  resetToDefaults: () => void;
  exportContentJson: () => void;
  importContentJson: (jsonStr: string) => boolean;
  leads: LeadSubmission[];
  addLead: (lead: Omit<LeadSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  deleteLead: (id: string) => void;
  updateLeadStatus: (id: string, status: LeadSubmission['status']) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialSiteContent, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load CMS content from localStorage', e);
    }
    return initialSiteContent;
  });

  const [leads, setLeads] = useState<LeadSubmission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEADS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load leads from localStorage', e);
    }
    return sampleLeads;
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [activeDrawerSection, setActiveDrawerSection] = useState<keyof SiteContent | 'leads' | 'settings' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync content to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save CMS content to localStorage', e);
    }
  }, [content]);

  // Sync leads to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to save leads to localStorage', e);
    }
  }, [leads]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => {
      const next = !prev;
      showToast(next ? 'מצב עריכה הופעל. לחץ על כל חלק לעריכה או פתח את סרגל הניהול.' : 'מצב תצוגה מקדימה הופעל.');
      return next;
    });
  };

  const setEditMode = (val: boolean) => {
    setIsEditMode(val);
    showToast(val ? 'מצב עריכה הופעל' : 'מצב תצוגה מקדימה הופעל');
  };

  const openDrawer = (section: keyof SiteContent | 'leads' | 'settings' = 'hero') => {
    setActiveDrawerSection(section);
  };

  const closeDrawer = () => {
    setActiveDrawerSection(null);
  };

  const updateSection = <K extends keyof SiteContent>(section: K, updates: Partial<SiteContent[K]>) => {
    setContent(prev => {
      const next = {
        ...prev,
        [section]: {
          ...(prev[section] as any),
          ...updates
        }
      };
      return next;
    });
    showToast('השינויים נשמרו בהצלחה!');
  };

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    showToast('כל התוכן עודכן בהצלחה!');
  };

  const resetToDefaults = () => {
    setContent(initialSiteContent);
    localStorage.removeItem(STORAGE_KEY_CONTENT);
    showToast('התוכן אופס לברירת המחדל המקורית');
  };

  const exportContentJson = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `maarava-content-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('קובץ נתוני האתר יוצא בהצלחה');
    } catch (err) {
      console.error(err);
      showToast('שגיאה בייצוא הנתונים');
    }
  };

  const importContentJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.hero || !parsed.meta || !parsed.about) {
        showToast('פורמט קובץ לא תקין. חסרים שדות נדרשים.');
        return false;
      }
      setContent(parsed);
      showToast('הנתונים יובאו בהצלחה!');
      return true;
    } catch (err) {
      console.error(err);
      showToast('שגיאה בפענוח קובץ JSON');
      return false;
    }
  };

  const addLead = (leadData: Omit<LeadSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newLead: LeadSubmission = {
      ...leadData,
      id: 'lead-' + Date.now(),
      submittedAt: new Date().toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'new'
    };
    setLeads(prev => [newLead, ...prev]);
    showToast('פניית הרישום נשלחה בהצלחה ונשמרה במערכת!');
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    showToast('פניית המתעניין נמחקה');
  };

  const updateLeadStatus = (id: string, status: LeadSubmission['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    showToast('סטטוס הפנייה עודכן');
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        isEditMode,
        toggleEditMode,
        setEditMode,
        activeDrawerSection,
        openDrawer,
        closeDrawer,
        updateSection,
        updateContent,
        resetToDefaults,
        exportContentJson,
        importContentJson,
        leads,
        addLead,
        deleteLead,
        updateLeadStatus,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
