export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'flores' | 'ceramica';
  image: string;
  available: boolean;
  featured?: boolean;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram?: string;
  facebook?: string;
}

export interface Address {
  id: string;
  name: string;
  address: string;
  coordinates?: [number, number]; // [latitude, longitude]
  openingHours?: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
}

export interface TeamMember {
  id: string;
  name: string;
  photo?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  contact: ContactInfo;
  about: {
    title: string;
    content: string;
    image?: string;
  };
  team?: TeamMember[];
}
