import "../styles/LoadingOverlay.css";

interface LoadingOverlayProps {
  loading: boolean;
}

const LoadingOverlay = ({ loading }: LoadingOverlayProps) => {
  if (!loading) return null;
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingOverlay;
