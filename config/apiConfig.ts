// Configurações para controlar o comportamento das APIs e evitar chamadas constantes

export const apiConfig = {
  // Configurações de cache para APIs
  cache: {
    // Tempo de cache para configurações (em segundos)
    settingsCacheTime: 300, // 5 minutos
    productsCacheTime: 600,  // 10 minutos
    
    // Headers de cache para evitar chamadas desnecessárias
    cacheHeaders: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
      'Vary': 'Accept-Encoding',
    },
    
    // Headers para forçar revalidação quando necessário
    noCacheHeaders: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
    }
  },
  
  // Configurações de rate limiting
  rateLimit: {
    // Máximo de chamadas por minuto para cada rota
    maxRequestsPerMinute: 60,
    
    // Tempo de espera entre chamadas (em milissegundos)
    minTimeBetweenRequests: 1000, // 1 segundo
  },
  
  // Configurações de polling (desabilitado por padrão)
  polling: {
    enabled: false, // Polling desabilitado para evitar conexões constantes
    interval: 0,    // Sem intervalo
  }
};

// Função para verificar se deve fazer cache
export function shouldCache(route: string): boolean {
  const cacheableRoutes = ['/api/admin/settings', '/api/admin/products'];
  return cacheableRoutes.includes(route);
}

// Função para obter headers de cache apropriados
export function getCacheHeaders(route: string, forceRefresh: boolean = false) {
  if (forceRefresh || !shouldCache(route)) {
    return apiConfig.cache.noCacheHeaders;
  }
  
  return apiConfig.cache.cacheHeaders;
}
