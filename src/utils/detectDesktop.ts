import { memoize } from "./memoiser";

function detectDesktop() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return !toMatch.some(agent=> navigator.userAgent.match(agent));
  }
  
export const memoisedDesktopCheck = memoize(detectDesktop);