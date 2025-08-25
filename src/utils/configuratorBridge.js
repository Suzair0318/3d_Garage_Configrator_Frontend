export const sendMessageToPlayCanvas = (message) => {
  const iframe = document.getElementById("configurator-iframe");
  console.log("iframe", iframe);
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(message, "*");
    console.warn("Message sent to PlayCanvas: " + message);
  }
};