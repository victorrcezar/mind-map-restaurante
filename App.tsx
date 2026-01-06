import React, { useState } from "react";
import MindMapCanvas from "./components/MindMapCanvas";
import MobileMindMap from "./components/MobileMindMap";
import Toolbar from "./components/Toolbar";
import { INITIAL_DATA } from "./constants";
import { MindMapNode } from "./types";
import { useHistory } from "./hooks/useHistory";
import { Instagram, Globe } from "lucide-react";

// Official WhatsApp Logo Component
const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.514-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.015-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

function App() {
  // Use custom hook for history management
  const { 
    state: data, 
    set: setData, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useHistory<MindMapNode>(INITIAL_DATA);

  const [shouldCenter, setShouldCenter] = useState(true);

  const LOGO_URL = "https://static.wixstatic.com/media/1f17f3_faf8f8e2f6fc4776b301d807c7ff80e6~mv2.png";
  
  const LINKS = {
    whatsapp: "https://wa.me/552721801710",
    instagram: "https://www.instagram.com/victorrcezar/",
    site: "https://upandco.com.br"
  };

  return (
    <div className="w-screen h-screen relative bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* Desktop View */}
      <div className="hidden md:block w-full h-full relative">
        <Toolbar 
          onCenter={() => setShouldCenter(true)} 
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />
        
        {/* Branding - Top Right */}
        <div className="absolute top-6 right-8 z-10 opacity-90 hover:opacity-100 transition-opacity">
           <img src={LOGO_URL} alt="UP! Company" className="h-12 w-auto object-contain drop-shadow-sm" />
        </div>

        <MindMapCanvas
          data={data}
          shouldCenter={shouldCenter}
          setShouldCenter={setShouldCenter}
        />
        
        {/* Contact Dock - Bottom Center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
           <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-2 py-2 rounded-full shadow-xl border border-white/50 ring-1 ring-slate-200/50">
              <a 
                href={LINKS.whatsapp} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-110 transition-all shadow-sm"
                title="WhatsApp"
              >
                <WhatsAppIcon size={20} className="text-white" />
              </a>
              
              <a 
                href={LINKS.instagram} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white hover:scale-110 transition-all shadow-sm"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>

              <a 
                href={LINKS.site} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-slate-900 hover:scale-110 transition-all shadow-sm"
                title="Website"
              >
                <Globe size={20} />
              </a>
              
              <div className="w-[1px] h-6 bg-slate-300 mx-1"></div>
              
              <span className="text-xs font-semibold text-slate-500 px-2 cursor-default whitespace-nowrap">
                UP! Company
              </span>
           </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full h-full bg-slate-50 flex flex-col">
         {/* Mobile Header */}
         <div className="px-6 py-3 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm z-20 sticky top-0 flex items-center justify-between">
            <img src={LOGO_URL} alt="UP! Company" className="h-8 w-auto object-contain" />
         </div>
         
         {/* Mobile Content */}
         <div className="flex-1 overflow-hidden relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute top-40 -left-20 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
            
            <MobileMindMap data={data} />
         </div>

         {/* Mobile Footer Actions */}
         <div className="w-full bg-white border-t border-slate-100 pb-safe pt-2 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
            <div className="flex justify-around items-center py-2">
               <a 
                 href={LINKS.whatsapp} 
                 target="_blank" 
                 rel="noreferrer" 
                 className="flex flex-col items-center gap-1 group"
               >
                 <div className="p-2 rounded-full bg-emerald-50 text-emerald-600 group-active:scale-95 transition-transform">
                   <WhatsAppIcon size={24} />
                 </div>
                 <span className="text-[10px] font-medium text-slate-600">WhatsApp</span>
               </a>

               <a 
                 href={LINKS.instagram} 
                 target="_blank" 
                 rel="noreferrer" 
                 className="flex flex-col items-center gap-1 group"
               >
                 <div className="p-2 rounded-full bg-pink-50 text-pink-600 group-active:scale-95 transition-transform">
                   <Instagram size={24} />
                 </div>
                 <span className="text-[10px] font-medium text-slate-600">Instagram</span>
               </a>

               <a 
                 href={LINKS.site} 
                 target="_blank" 
                 rel="noreferrer" 
                 className="flex flex-col items-center gap-1 group"
               >
                 <div className="p-2 rounded-full bg-slate-50 text-slate-700 group-active:scale-95 transition-transform">
                   <Globe size={24} />
                 </div>
                 <span className="text-[10px] font-medium text-slate-600">Site</span>
               </a>
            </div>
         </div>
      </div>

    </div>
  );
}

export default App;