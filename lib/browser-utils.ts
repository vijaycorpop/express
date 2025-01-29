export const isBrowser = typeof window !== 'undefined';

export const getBrowserInfo = () => {
  if (!isBrowser) {
    return {
      isChrome: false,
      isFirefox: false,
      isSafari: false,
      isEdge: false,
      isIE: false,
    };
  }

  const ua = window.navigator.userAgent.toLowerCase();
  
  return {
    isChrome: /chrome/.test(ua) && !/edge/.test(ua),
    isFirefox: /firefox/.test(ua),
    isSafari: /safari/.test(ua) && !/chrome/.test(ua),
    isEdge: /edge/.test(ua),
    isIE: /msie|trident/.test(ua),
  };
};
