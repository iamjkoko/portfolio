export const fadeOutPage = (videoRef, duration = 800) => {
    return new Promise((resolve) => {
      if (videoRef?.current) {
        videoRef.current.style.opacity = "0";
      }
      document.body.style.opacity = "0";
      
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };
  
  export const fadeInPage = () => {
    document.body.style.opacity = '1';
  };