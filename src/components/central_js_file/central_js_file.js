
//   useEffect(() => {
//     // Browser-only
//     if (typeof window === 'undefined') return;

//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     const onWindowMessage = (event) => {
//       const data = event.data;
//       if (data === 'app:ready1') {
//         setIsLoading(false);

//         const app = iframeRef.current;
//         if (!app || !app.contentWindow) return;
//         const post = (payload) => app.contentWindow.postMessage(payload, '*');

//         // Hardcoded message sequence
//         post('Carportsbuilding');
//         post('barn_height : ' + 10);
//         post('barn_Width : ' + 24);
//         post('barn_Length : ' + 40);

//         post('leansLeftW : ' + 6);
//         post('leansLeftL : ' + 20);
//         post('leansheightL : ' + 6);

//         post('leansRightW : ' + '10');
//         post('leansRightL : ' + '40');
//         post('leansheightR : ' + '6');

//         post('leansLeftW : ' + '10');
//         post('leansLeftL : ' + '40');
//         post('leansheightL : ' + '6');

//         post('storageFeetL : ' + 4);

//         // post('Rsidewalls : ' + 'Open');
//         // post('Rbackwalls : ' + 'Open');
//         // post('Rfontwalls : ' + 'Open');

//         setTimeout(() => {
//           post('barn_heightS');
//         }, 1000);
//       }
//     }