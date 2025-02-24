import useZoom from "@/hooks/useZoom";
import { PreviewImage } from "@/types";
import Box from "@mui/material/Box";
import { FC } from "react";

const ZoomImage: FC<ZoomImageProps> = ({ src, alt, label }) => {
  const {
    scale,
    position,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useZoom();

  return (
    <Box
      style={{
        overflow: "hidden",
        display: "inline-block",
        position: "relative",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? label ?? "Preview image"}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          cursor: "zoom-in",
          transition: "transform 0.2s ease",
          transform: `scale(${scale})`,
          transformOrigin: `${position.x} ${position.y}`,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </Box>
  );
};

type ZoomImageProps = PreviewImage;

export default ZoomImage;
