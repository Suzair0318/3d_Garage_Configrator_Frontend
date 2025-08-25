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


  // Fetch categories + events and pick the first category's events
  useEffect(() => {
    let abort = false;
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/building/categories_items');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        console.log("API", data)
        if (abort) return;
        const first = Array.isArray(data) ? data[0] : null
        const evts = first && Array.isArray(first.events) ? first.events : [];
        setEvents(evts[0] || {});
      } catch (e) {
        console.error('Failed to fetch events:', e);
        setEvents([]);
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
          Carportsbuilding: null,
          barn_height : 10,
          barn_Width: 24,
          barn_Length: 40,
          leansLeftW: 6,
          leansLeftL: 20,
          leansheightL: 6,
          leansRightW: 10,
          leansRightL: 40,
          leansheightR: 6,
          storageFeetL: 4,
          barn_heightS: null,
        });

        const s = useStore.getState().events;
  
        // Helper to pull value with default and ignore empty strings/null/undefined
        const e = s || {};
        const vOr = (k) => {
          const v = e[k];
          return v;
        };

        // 1) Trigger base build
        post('Carportsbuilding');

        // 2) Primary set
        post('barn_height : ' + vOr('barn_height', 10));
        post('barn_Width : ' + vOr('barn_Width', 24));
        post('barn_Length : ' + vOr('barn_Length', 40));

        post('leansLeftW : ' + vOr('leansLeftW', 6));
        post('leansLeftL : ' + vOr('leansLeftL', 20));
        post('leansheightL : ' + vOr('leansheightL', 6));

        post('leansRightW : ' + vOr('leansRightW', 10));
        post('leansRightL : ' + vOr('leansRightL', 40));
        post('leansheightR : ' + vOr('leansheightR', 6));

        // 3) Left leans updated (second set)
        post('leansLeftW : ' + vOr('leansLeftW2', 10));
        post('leansLeftL : ' + vOr('leansLeftL2', 40));
        post('leansheightL : ' + vOr('leansheightL2', 6));

        // 4) Storage and walls
        post('storageFeetL : ' + vOr('storageFeetL', 4));

        post('Rsidewalls : ' + 'Open');
        post('Rbackwalls : ' + 'Open');
        post('Rfontwalls : ' + 'Open');

        // 5) Final delayed trigger
        setTimeout(() => {
          post('barn_heightS');
        }, 1000);
 
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