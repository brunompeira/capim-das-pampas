/**
 * Formata o preço de um produto
 * Se o preço for 0, retorna "Preço sob consulta" com estilos específicos
 * Caso contrário, formata como moeda EUR
 */
export const formatPrice = (price: number): { text: string; isConsultation: boolean } => {
  if (price === 0 || price === null || price === undefined) {
    return {
      text: 'Preço sob consulta',
      isConsultation: true
    };
  }
  
  return {
    text: new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price),
    isConsultation: false
  };
};

/**
 * Verifica se deve mostrar o preço
 * Retorna false se o preço for 0, null ou undefined
 */
export const shouldShowPrice = (price: number): boolean => {
  return price > 0 && price !== null && price !== undefined;
};
