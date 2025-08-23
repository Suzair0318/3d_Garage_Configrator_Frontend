import { useEffect, useRef, useState } from 'react';
import useStore from '../store/useStore';
import { setIframe, setReady, sendToConfigurator } from '../utils/configuratorBridge';

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

  // Fetch categories + events and pick the first category's events
  // useEffect(() => {
  //   let abort = false;
  //   const fetchEvents = async () => {
  //     try {
  //       const res = await fetch('http://localhost:3001/api/building/categories_items');
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       const data = await res.json();
  //       if (abort) return;
  //       const first = Array.isArray(data) ? data[0] : null;
  //       const evts = first && Array.isArray(first.events) ? first.events : [];
  //       setEvents(evts);
  //     } catch (e) {
  //       console.error('Failed to fetch events:', e);
  //       setEvents([]);
  //     }
  //   };
  //   fetchEvents();
  //   return () => { abort = true; };
  // }, []);

  // Register iframe window in the global bridge
  useEffect(() => {
    if (iframeRef.current) {
      setIframe(iframeRef.current);
    }
    return () => {
      // Clear on unmount
      setIframe(null);
    };
  }, []);

  // useEffect(() => {
  //   // Browser-only
  //   if (typeof window === 'undefined') return;

  //   const iframe = iframeRef.current;
  //   if (!iframe) return;

  //   const onWindowMessage = (event) => {
  //     const data = event.data;
  //     if (data === 'app:ready1') {
  //       setIsLoading(false);
  //       // Mark the bridge as ready so queued messages from anywhere flush
  //       setReady(true);

  //       const app = iframeRef.current;
  //       if (!app || !app.contentWindow) return;

  //       const send = (payload) => app.contentWindow.postMessage(payload, '*');
  //       const counts = {};

  //       if (!Array.isArray(events) || events.length === 0) return;
  //       events.forEach((evt) => {
  //         // Track occurrences for events that need different values per occurrence
  //         counts[evt] = (counts[evt] || 0) + 1;

  //         if (evt === 'Carportsbuilding') {
  //           send('Carportsbuilding');
  //           return;
  //         }
  //         if (evt === 'barn_heightS') {
  //           setTimeout(() => send('barn_heightS'), 1000);
  //           return;
  //         }

  //         let value;
  //         switch (evt) {
  //           case 'barn_height':
  //             value = 10; break;
  //           case 'barn_Width':
  //             value = 24; break;
  //           case 'barn_Length':
  //             value = 40; break;
  //           case 'leansLeftW':
  //             value = counts[evt] === 1 ? 6 : 10; break;
  //           case 'leansLeftL':
  //             value = counts[evt] === 1 ? 20 : 40; break;
  //           case 'leansheightL':
  //             value = 6; break;
  //           case 'leansRightW':
  //             value = 10; break;
  //           case 'leansRightL':
  //             value = 40; break;
  //           case 'leansheightR':
  //             value = 6; break;
  //           case 'storageFeetL':
  //             value = 4; break;
  //           case 'Rsidewalls':
  //           case 'Rbackwalls':
  //           case 'Rfontwalls':
  //             value = 'Open'; break;
  //           default:
  //             value = undefined;
  //         }

  //         if (value !== undefined) {
  //           send(`${evt} : ${value}`);
  //         } else {
  //           send(evt);
  //         }
  //       });
  //     }
  //   };

  //   window.addEventListener('message', onWindowMessage);

  //   return () => {
  //     window.removeEventListener('message', onWindowMessage);
  //   };
  // }, [events]);

  return (
    <div className="relative w-full h-full">
      {/* {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#E6E6E6]">
          <span className="text-gray-700">Loading…</span>
        </div>
      )} */}
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
