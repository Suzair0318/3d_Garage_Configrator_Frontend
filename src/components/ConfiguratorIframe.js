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

        // API-driven message sequence (persist to Zustand first, then send)
        const e = (events && typeof events === 'object') ? events : {};
        const def = {
          barn_height: 10,
          barn_Width: 24,
          barn_Length: 40,
          leansLeftW: 6,
          leansLeftL: 20,
          leansheightL: 6,
          leansRightW: 10,
          leansRightL: 40,
          leansheightR: 6,
          storageFeetL: 4,
        };
        const vOrDef = (k) => {
          const v = e[k];
          return (v === '' || v === undefined || v === null) ? def[k] : v;
        };

        // 1) First patch store with the primary set
        const primaryPatch = {
          barn_height: vOrDef('barn_height'),
          barn_Width: vOrDef('barn_Width'),
          barn_Length: vOrDef('barn_Length'),
          leansLeftW: vOrDef('leansLeftW'),
          leansLeftL: vOrDef('leansLeftL'),
          leansheightL: vOrDef('leansheightL'),
          leansRightW: vOrDef('leansRightW'),
          leansRightL: vOrDef('leansRightL'),
          leansheightR: vOrDef('leansheightR'),
          storageFeetL: vOrDef('storageFeetL'),
        };
        patchEventValues(primaryPatch);
      

        // 2) Read back from store and send in desired order/format
        const s = useStore.getState().events;
        post('Carportsbuilding');
        post('barn_height : ' + s.barn_height);
        post('barn_Width : ' + s.barn_Width);
        post('barn_Length : ' + s.barn_Length);

        post('leansLeftW : ' + s.leansLeftW);
        post('leansLeftL : ' + s.leansLeftL);
        post('leansheightL : ' + s.leansheightL);

        post('leansRightW : ' + s.leansRightW);
        post('leansRightL : ' + s.leansRightL);
        post('leansheightR : ' + s.leansheightR);

        // 3) Apply second set for left leans, persist then send
        const secondSet = {
          leansLeftW: (e.leansLeftW2 ?? '10'),
          leansLeftL: (e.leansLeftL2 ?? '40'),
          leansheightL: (e.leansheightL2 ?? '6'),
        };
        patchEventValues(secondSet);
        const s2 = useStore.getState().events;
        post('leansLeftW : ' + s2.leansLeftW);
        post('leansLeftL : ' + s2.leansLeftL);
        post('leansheightL : ' + s2.leansheightL);

        // Continue with the rest
        post('storageFeetL : ' + s2.storageFeetL);

        // Skipping walls per your preference
        // post('Rsidewalls : ' + (s2.Rsidewalls ?? 'Open'));
        // post('Rbackwalls : ' + (s2.Rbackwalls ?? 'Open'));
        // post('Rfontwalls : ' + (s2.Rfontwalls ?? 'Open'));

        setTimeout(() => {
          post('barn_heightS');
        }, 1000);
      }
    };

    window.addEventListener('message', onWindowMessage);

    return () => {
      window.removeEventListener('message', onWindowMessage);
    };
  }, [events]);

 
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