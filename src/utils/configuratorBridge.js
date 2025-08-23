// A simple global bridge to send messages to the PlayCanvas iframe
// Usage:
//   import { sendToConfigurator } from '../utils/configuratorBridge';
//   sendToConfigurator('SomeEvent');
//
// The iframe registers itself and marks readiness from ConfiguratorIframe.

let targetWindow = null;
let isReady = false;
const queue = [];

function flushQueue() {
  if (!targetWindow || !isReady) return;
  while (queue.length) {
    const msg = queue.shift();
    try {
      targetWindow.postMessage(msg, '*');
    } catch (e) {
      // If posting fails, stop flushing to avoid infinite loop
      queue.unshift(msg);
      break;
    }
  }
}

export function setIframe(iframeEl) {
  targetWindow = iframeEl?.contentWindow || null;
  flushQueue();
}

export function setReady(ready = true) {
  isReady = !!ready;
  flushQueue();
}

export function sendToConfigurator(message) {
  if (targetWindow && isReady) {
    try {
      targetWindow.postMessage(message, '*');
      return true;
    } catch (e) {
      // Fall through to queue if any transient error
    }
  }
  queue.push(message);
  return false;
}
