import { useEffect, useRef, useState } from 'react';
import useStore from '../store/useStore';
import { sendMessageToPlayCanvas } from '../utils/configuratorBridge';

export default function ConfiguratorIframe({ src = "https://playcanv.as/e/p/iUeWwwVb/", title = "3D Garage Configurator" }) {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // const sendMessageToPlayCanvas = (message) => {
  //   // Use global bridge so any module can also send messages
  //   return sendToConfigurator(message);
  // };

  // Events fetched from backend (simple array) stored in Zustand
  const events = useStore((s) => s.events);
  const setEvents = useStore((s) => s.setEvents);
  const patchEventValues = useStore((s) => s.patchEventValues);


  // Fetch global events payload and store into Zustand
  useEffect(() => {
    let abort = false;
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/building/events');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log("API /events", data);
        if (abort) return;
        const arr = data && Array.isArray(data.events) ? data.events : [];
        const first = arr[0] || {};
        setEvents(first);
      } catch (e) {
        console.error('Failed to fetch events:', e);
        setEvents({});
      }
    };
    fetchEvents();
    return () => { abort = true; };
  }, []);

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

      

        patchEventValues({
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
        });

        const s = useStore.getState().events;
  
        const e = s || {};
       console.log('events', e);

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
          const value = e[key];
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