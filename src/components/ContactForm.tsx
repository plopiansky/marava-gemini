import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Sparkles } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { EditTrigger } from './cms/EditTrigger';

export const ContactForm: React.FC = () => {
  const { content, addLead } = useCms();
  const { contact, meta } = content;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    studentGrade: 'ח',
    parentName: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      return;
    }

    addLead({
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      studentGrade: formData.studentGrade,
      parentName: formData.parentName.trim() || undefined,
      notes: formData.notes.trim() || undefined,
    });

    setSubmissionId(`MRV-${Math.floor(1000 + Math.random() * 9000)}`);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      studentGrade: 'ח',
      parentName: '',
      notes: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with Blue Box */}
        <div className="bg-blue-950 rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl border border-blue-900">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Info Column (Right in RTL) */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 text-white bg-subtle-pattern relative flex flex-col justify-between">
              <div className="absolute inset-0 bg-blue-950/85 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {contact.kicker}
                  </span>
                  <EditTrigger sectionKey="contact" label="עריכת פרטי יצירת קשר" />
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-torah text-white leading-tight mb-4">
                  {contact.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-10">
                  {contact.description}
                </p>

                {/* Contact List */}
                <div className="space-y-6 text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        {contact.addressTitle}
                      </div>
                      <div className="text-slate-300 text-xs sm:text-sm mt-0.5 leading-relaxed">
                        {contact.addressDetails}
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        {contact.phoneTitle}
                      </div>
                      <div className="text-slate-300 text-xs sm:text-sm mt-0.5" dir="ltr">
                        <a href={`tel:${meta.phone}`} className="hover:text-amber-300 transition-colors">
                          {contact.phoneDetails}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        {contact.emailTitle}
                      </div>
                      <div className="text-slate-300 text-xs sm:text-sm mt-0.5" dir="ltr">
                        <a href={`mailto:${meta.email}`} className="hover:text-amber-300 transition-colors">
                          {contact.emailDetails}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">
                        שעות קבלת קהל:
                      </div>
                      <div className="text-slate-300 text-xs sm:text-sm mt-0.5">
                        {contact.visitingHours}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="relative z-10 pt-8 mt-8 border-t border-white/10 text-xs text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>פניות נענות בדיסקרטיות ובמהירות ע"י צוות ההנהלה של הישיבה.</span>
              </div>
            </div>

            {/* Form Column (Left in RTL) */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 bg-white flex flex-col justify-center">
              
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-torah text-blue-950">
                    תודה רבה! פנייתכם התקבלה בהצלחה
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    פרטיכם נקלטו במערכת הרישום של ישיבת מערבא (מספר פנייה: <span className="font-mono font-bold text-blue-900">{submissionId}</span>).
                    צוות הרישום וההנהלה ייצור עמכם קשר טלפוני בהקדם לקביעת שיחת היכרות וסיור בקמפוס.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      שליחת פנייה נוספת
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold font-torah text-blue-950">
                      טופס פנייה והרשמה לשנה הבאה
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      מלאו את הפרטים ונחזור אליכם לתיאום פגישה אישית.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          שם מלא של התלמיד <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="למשל: דניאל כהן"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm outline-hidden transition-all bg-slate-50 focus:bg-white"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          טלפון נייד ליצירת קשר <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="050-1234567"
                          dir="ltr"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm outline-hidden transition-all bg-slate-50 focus:bg-white text-right"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Parent Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          שם ההורה / אפוטרופוס
                        </label>
                        <input
                          type="text"
                          value={formData.parentName}
                          onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                          placeholder="שם ההורה"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm outline-hidden transition-all bg-slate-50 focus:bg-white"
                        />
                      </div>

                      {/* Grade Selection */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          כיתה נוכחית של התלמיד
                        </label>
                        <select
                          value={formData.studentGrade}
                          onChange={(e) => setFormData({ ...formData, studentGrade: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm outline-hidden transition-all bg-slate-50 focus:bg-white"
                        >
                          <option value="ח">כיתה ח' (עולה לשיעור א' / ט')</option>
                          <option value="ט">כיתה ט' (מעבר לשיעור ב')</option>
                          <option value="י">כיתה י' (מעבר לשיעור ג')</option>
                          <option value="אחר">אחר</option>
                        </select>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        דואר אלקטרוני (אופציונלי)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your-email@example.com"
                        dir="ltr"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm outline-hidden transition-all bg-slate-50 focus:bg-white text-right"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        הערות או שאלות נוספות
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="פרטים על תחומי עניין (לימודי קודש, מגמת מחשבים, מוזיקה וכד')..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 text-sm outline-hidden transition-all bg-slate-50 focus:bg-white resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-blue-950 hover:bg-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>שליחת פנייה לצוות הישיבה</span>
                    </button>
                  </form>
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
