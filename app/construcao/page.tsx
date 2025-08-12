'use client';

import { useState, useEffect } from 'react';
import { Wrench, Clock, Mail, Phone } from 'lucide-react';

export default function ConstrucaoPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
         // Data estimada de conclusão (podes ajustar)
     const targetDate = new Date('2025-08-15T20:00:00');
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
         <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center px-4">
       <div className="max-w-4xl mx-auto text-center">
         {/* Logo/Ícone */}
         <div className="mb-8">
           <div className="mx-auto w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mb-6">
             <Wrench className="w-12 h-12 text-white" />
           </div>
           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
             Capim das Pampas
           </h1>
           <h2 className="text-2xl md:text-3xl font-semibold text-primary-600 mb-2">
             Site em Construção
           </h2>
         </div>

                 {/* Mensagem principal */}
         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-primary-100">
           <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
             Estamos a trabalhar para trazer-te uma experiência incrível! 
             O nosso novo site estará em breve disponível com todas as funcionalidades 
             para gerir a tua loja de flores e cerâmica.
           </p>
         </div>

                 {/* Contador regressivo */}
         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-primary-100">
           <h3 className="text-xl font-semibold text-gray-800 mb-6">
             <Clock className="inline w-6 h-6 mr-2 text-primary-600" />
             Lançamento em:
           </h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="text-center">
               <div className="bg-primary-600 text-white text-2xl md:text-4xl font-bold rounded-lg p-4 mb-2">
                 {timeLeft.days}
               </div>
               <div className="text-sm text-gray-600">Dias</div>
             </div>
             <div className="text-center">
               <div className="bg-primary-600 text-white text-2xl md:text-4xl font-bold rounded-lg p-4 mb-2">
                 {timeLeft.hours}
               </div>
               <div className="text-sm text-gray-600">Horas</div>
             </div>
             <div className="text-center">
               <div className="bg-primary-600 text-white text-2xl md:text-4xl font-bold rounded-lg p-4 mb-2">
                 {timeLeft.minutes}
               </div>
               <div className="text-sm text-gray-600">Minutos</div>
             </div>
             <div className="text-center">
               <div className="bg-primary-600 text-white text-2xl md:text-4xl font-bold rounded-lg p-4 mb-2">
                 {timeLeft.seconds}
               </div>
               <div className="text-sm text-gray-600">Segundos</div>
             </div>
           </div>
         </div>

                 {/* Informações de contacto */}
         <div className="bg-white rounded-2xl shadow-xl p-8 border border-primary-100">
           <h3 className="text-xl font-semibold text-gray-800 mb-6">
             📞 Contacta-nos entretanto:
           </h3>
           <div className="grid md:grid-cols-2 gap-6">
             <div className="flex items-center justify-center space-x-3 text-primary-700">
               <Phone className="w-5 h-5" />
               <span className="text-lg">+351 934 305 372</span>
             </div>
             <div className="flex items-center justify-center space-x-3 text-primary-700">
               <Mail className="w-5 h-5" />
               <span className="text-lg">capimdaspampas@gmail.com</span>
             </div>
           </div>
           <p className="text-gray-600 mt-6 text-sm">
             Estamos disponíveis para responder às tuas questões e encomendas!
           </p>
         </div>

        {/* Footer */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>© 2024 Capim das Pampas. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}
