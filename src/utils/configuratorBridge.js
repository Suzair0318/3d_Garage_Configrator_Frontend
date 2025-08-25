export const sendMessageToPlayCanvas = (message) => {
  const iframe = document.getElementById("configurator-iframe");
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(message, "*");
    console.log("PlayCanvas: " + message);
  }
};