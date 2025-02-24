import { useState } from "react";

const useZoom = (
  initialScale: number = 1,
  zoomStep: number = 0.2,
  maxScale: number = 3,
  minScale: number = 1
) => {
  const [scale, setScale] = useState(initialScale);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });

  // Zoom in
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + zoomStep, maxScale));
  };

  // Zoom out
  const zoomOut = () => {
    setScale((prev) => Math.max(prev - zoomStep, minScale));
    if (scale - zoomStep <= minScale) setPosition({ x: 0, y: 0 }); // Reset position when fully zoomed out
  };

  // Reset zoom
  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale > 1) {
      setIsPanning(true);
      setStartCoords({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  // Handle drag move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    setPosition({ x: e.clientX - startCoords.x, y: e.clientY - startCoords.y });
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return {
    scale,
    position,
    zoomIn,
    zoomOut,
    resetZoom,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

export default useZoom;
