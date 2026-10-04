export interface SiteMetadata {
  title: string;
  subtitle: string;
  tagline: string;
  foundedYear: string;
  roshYeshiva: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  registrationOpenText: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  subtext?: string;
}

export interface HeroSectionContent {
  badge: string;
  heading: string;
  highlightedText: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  stats: StatItem[];
}

export interface AboutBullet {
  id: string;
  title: string;
  description: string;
}

export interface AboutSectionContent {
  kicker: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  quote: string;
  quoteAuthor: string;
  bullets: AboutBullet[];
  imageUrl: string;
  yearsBadgeNumber: string;
  yearsBadgeLabel: string;
}

export interface VisionTrack {
  id: string;
  iconName: 'torah' | 'stem' | 'music' | 'campus';
  title: string;
  description: string;
  highlights: string[];
}

export interface VisionSectionContent {
  kicker: string;
  title: string;
  subtitle: string;
  tracks: VisionTrack[];
}

export interface ScheduleItem {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  category: 'kodesh' | 'chol' | 'activities' | 'break';
  highlight?: boolean;
}

export interface ScheduleSectionContent {
  kicker: string;
  title: string;
  description: string;
  items: ScheduleItem[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface StaffSectionContent {
  kicker: string;
  title: string;
  subtitle: string;
  members: StaffMember[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'bet-midrash' | 'studies' | 'music' | 'campus-life';
  imageUrl: string;
  spanCol?: boolean;
}

export interface GallerySectionContent {
  kicker: string;
  title: string;
  subtitle: string;
  items: GalleryItem[];
}

export interface AlumniTestimonial {
  id: string;
  name: string;
  graduationYear: string;
  currentRole: string;
  quote: string;
}

export interface AlumniSectionContent {
  kicker: string;
  title: string;
  subtitle: string;
  testimonials: AlumniTestimonial[];
}

export interface ContactSectionContent {
  kicker: string;
  title: string;
  description: string;
  addressTitle: string;
  addressDetails: string;
  phoneTitle: string;
  phoneDetails: string;
  emailTitle: string;
  emailDetails: string;
  visitingHours: string;
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  studentGrade: string;
  parentName?: string;
  notes?: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'registered' | 'archived';
}

export interface SiteContent {
  meta: SiteMetadata;
  hero: HeroSectionContent;
  about: AboutSectionContent;
  vision: VisionSectionContent;
  schedule: ScheduleSectionContent;
  staff: StaffSectionContent;
  gallery: GallerySectionContent;
  alumni: AlumniSectionContent;
  contact: ContactSectionContent;
}
