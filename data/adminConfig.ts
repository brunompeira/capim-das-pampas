export interface AdminContactSettings {
  phone: string;
  email: string;
  addresses: Array<{
    id: string;
    name: string;
    address: string;
    coordinates?: [number, number];
    openingHours: {
      monday: { open: string; close: string; closed: boolean };
      tuesday: { open: string; close: string; closed: boolean };
      wednesday: { open: string; close: string; closed: boolean };
      thursday: { open: string; close: string; closed: boolean };
      friday: { open: string; close: string; closed: boolean };
      saturday: { open: string; close: string; closed: boolean };
      sunday: { open: string; close: string; closed: boolean };
    };
  }>;
}

export interface TeamMember {
  id: string;
  name: string;
  photo?: string;
}

export interface AdminSiteSettings {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  openingHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  team: TeamMember[];
}

// Configurações padrão que serão usadas se não houver configurações salvas
export const defaultAdminSettings: AdminSiteSettings = {
  name: 'Capim das Pampas',
  email: 'contacto@capimdaspampas.pt',
  phone: '+351 912 345 678',
  whatsapp: '+351 912 345 678',
  address: 'Rua das Flores, 123 - 1000-001 Lisboa, Portugal',
  openingHours: {
    monday: { open: '08:00', close: '18:00', closed: false },
    tuesday: { open: '08:00', close: '18:00', closed: false },
    wednesday: { open: '08:00', close: '18:00', closed: false },
    thursday: { open: '08:00', close: '18:00', closed: false },
    friday: { open: '08:00', close: '18:00', closed: false },
    saturday: { open: '08:00', close: '16:00', closed: false },
    sunday: { open: '10:00', close: '16:00', closed: true },
  },
  team: [
    { id: '1', name: 'Maria Silva', photo: '' },
    { id: '2', name: 'João Santos', photo: '' },
    { id: '3', name: 'Ana Costa', photo: '' }
  ]
};

export const defaultContactSettings: AdminContactSettings = {
  phone: '+351 912 345 678',
  email: 'contacto@capimdaspampas.pt',
  addresses: [
    {
      id: '1',
      name: 'Loja Principal',
      address: 'Rua das Flores, 123 - 1000-001 Lisboa, Portugal',
      openingHours: {
        monday: { open: '08:00', close: '18:00', closed: false },
        tuesday: { open: '08:00', close: '18:00', closed: false },
        wednesday: { open: '08:00', close: '18:00', closed: false },
        thursday: { open: '08:00', close: '18:00', closed: false },
        friday: { open: '08:00', close: '18:00', closed: false },
        saturday: { open: '08:00', close: '16:00', closed: false },
        sunday: { open: '10:00', close: '16:00', closed: true },
      }
    }
  ]
};

// Funções removidas para resolver erro de build
// As configurações são carregadas diretamente nos componentes
