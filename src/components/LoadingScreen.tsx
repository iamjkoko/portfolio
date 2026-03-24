type LoadingScreenProps = {
  isVisible: boolean;
};

const LoadingScreen = ({ isVisible }: LoadingScreenProps) => {
  return (
    <div
      className="fixed inset-0 bg-black z-[10000] pointer-events-none transition-opacity duration-700 ease-out"
      style={{ opacity: isVisible ? 1 : 0 }}
    />
  );
};

export default LoadingScreen;
