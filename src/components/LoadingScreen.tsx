import { createPortal } from 'react-dom';

type LoadingScreenProps = {
  isVisible: boolean;
};

/*
 * Rendered via portal: the page-transition wrapper (AnimatedPage) applies a
 * CSS filter, which turns `position: fixed` descendants into being positioned
 * relative to it instead of the viewport, pushing the centered content
 * off-screen.
 */
const LoadingScreen = ({ isVisible }: LoadingScreenProps) => {
  return createPortal(
    <div
      className="fixed inset-0 bg-black z-[10090] pointer-events-none flex items-center justify-center transition-opacity duration-700 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden={!isVisible}
    >
      <span className="loading-dot" />
    </div>,
    document.body
  );
};

export default LoadingScreen;
