'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Address } from '@/types';

// Fix para os ícones do Leaflet no Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  addresses: Address[];
  isLoading: boolean;
}

export default function Map({ addresses, isLoading }: MapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  // Coordenadas padrão (Lisboa) se não houver coordenadas específicas
  const defaultCoordinates: [number, number] = [38.7223, -9.1393];

  // Usar as coordenadas do primeiro endereço com coordenadas configuradas, ou coordenadas padrão
  const coordinates = addresses.find(addr => addr.coordinates)?.coordinates || defaultCoordinates;
  
  // Carregar mapa apenas quando necessário
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !isMapLoaded) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-96 flex items-center justify-center border border-gray-200 shadow-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">A carregar mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl h-96 border border-gray-200 shadow-lg overflow-hidden">
      <MapContainer
        center={coordinates}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {addresses.map((address) => {
          // Só mostrar marcador se tiver coordenadas configuradas e válidas
          if (!address.coordinates || 
              !Array.isArray(address.coordinates) || 
              address.coordinates.length !== 2 ||
              typeof address.coordinates[0] !== 'number' ||
              typeof address.coordinates[1] !== 'number' ||
              address.coordinates[0] < -90 || address.coordinates[0] > 90 ||
              address.coordinates[1] < -180 || address.coordinates[1] > 180) {
            return null;
          }
          
          return (
            <Marker key={address.id} position={address.coordinates}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">{address.name}</h3>
                  <p className="text-gray-600 text-sm">{address.address}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
