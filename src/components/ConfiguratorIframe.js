import { useEffect, useRef, useState } from 'react';
import useStore from '../store/useStore';
import { sendMessageToPlayCanvas } from '../utils/configuratorBridge';

export default function ConfiguratorIframe({ src = "https://playcanv.as/e/p/iUeWwwVb/", title = "3D Garage Configurator" }) {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Browser-only
    if (typeof window === 'undefined') return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const onWindowMessage = (event) => {
      const data = event.data;
      if (data === 'app:ready1') {
        setIsLoading(false);
        const app = iframeRef.current;
        if (!app) return;
        const post = (payload) => sendMessageToPlayCanvas(payload);

        const d = {
          enabledAllBuilding: null,
          barn_heightS: null,
          Carportsbuilding: null,
          barn_height : 10,
          barn_Width: 24,
          barn_Length: 40, 
          trimColor : '#832c00',
          roofColor : '#832c00',
          backstorage : 'disabled',
          leftstorage : 'disabled',
          fontwalls : 'Open',
          backwalls : 'Open',
          leftwalls : 'Open',
          rightwalls : 'Open',
          rightleansFalse : null,
          leftleansFalse : null,  
        };

        
        // 2) Post values in required order using a loop
        const orderedKeys = [
          'enabledAllBuilding',
          'barn_heightS',
          'Carportsbuilding',
          'barn_height',
          'barn_Width',
          'barn_Length',
          'trimColor',
          'roofColor',
          'backstorage',
          'leftstorage',
          'fontwalls',
          'backwalls',
          'leftwalls',
          'rightwalls',
          'rightleansFalse',
          'leftleansFalse',
        ];

        for (const key of orderedKeys) {
          const value = d[key];
          if (value === null) {
            post(`${key}`);
          } else if (value !== undefined && value !== '') {
            post(`${key} : ${value}`);
          }
        }

      }
    };

    window.addEventListener('message', onWindowMessage);

    return () => {
      window.removeEventListener('message', onWindowMessage);
    };
  }, []);

 
  return (
    <div className="relative w-full h-full">
       {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#E6E6E6]">
          <span className="text-gray-700">Loading…</span>
        </div>
      )} 
      <iframe
        ref={iframeRef}
        src={src}
        className="w-full h-full border-none bg-[#E6E6E6]"
        id="configurator-iframe"
        title={title}
        allow="xr-spatial-tracking; fullscreen; autoplay"
        allowFullScreen
      />
    </div>
  );
}