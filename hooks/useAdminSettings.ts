import { useState, useEffect } from 'react';
import { defaultAdminSettings, defaultContactSettings, TeamMember } from '@/data/adminConfig';

export const useAdminSettings = () => {
  const [adminSettings, setAdminSettings] = useState(defaultAdminSettings);
  const [contactSettings, setContactSettings] = useState(defaultContactSettings);
  const [team, setTeam] = useState<TeamMember[]>(defaultAdminSettings.team);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Função para carregar as configurações
    const loadSettings = async () => {
      try {
        // Fazer apenas uma chamada para a API
        const response = await fetch(`/api/admin/settings?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setAdminSettings(data.siteSettings || defaultAdminSettings);
          setContactSettings(data.contactSettings || defaultContactSettings);
          setTeam(data.siteSettings?.team || defaultAdminSettings.team);
        } else {
          console.error('Erro na resposta:', response.status);
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Carregar configurações iniciais
    loadSettings();

    // Polling para verificar mudanças (a cada 5 segundos)
    const interval = setInterval(loadSettings, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { adminSettings, contactSettings, team, isLoading };
};
