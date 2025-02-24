import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import Iconify from "./iconify";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { PreviewImage } from "@/types";
import useZoom from "@/hooks/useZoom";
import ZoomImage from "./zoomImage";

const PreviewModal: FC<PreviewModalProps> = ({
  previewImage,
  images,
  setDisplaypreview,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { zoomIn, zoomOut } = useZoom();

  const selectedImage = useMemo<PreviewImage>(() => {
    if (currentIndex >= 0 && images) {
      return images[currentIndex];
    }

    return previewImage;
  }, [currentIndex, images, previewImage]);

  const handleNext = () => {
    if (!images) return;

    const len = images.length - 1;

    if (currentIndex == len) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!images) return;

    const len = images.length - 1;

    if (currentIndex === 0) {
      setCurrentIndex(len);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleDownload = async () => {
    if (!selectedImage) return;

    try {
      const response = await fetch(selectedImage.src, { mode: "cors" });

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = selectedImage.label || "image.jpg";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  useEffect(() => {
    if (images) {
      const index = images.findIndex(
        (item) =>
          item.src === previewImage.src &&
          (previewImage.label ? item.label === previewImage.label : true)
      );

      if (index >= 0) {
        setCurrentIndex(index);
      }
    } else {
      setCurrentIndex(-1);
    }
  }, [images, previewImage.label, previewImage.src]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Stack
      gap={2}
      justifyContent="center"
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 7777,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 60,
          height: 60,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          borderBottomLeftRadius: "100%",
        }}
      >
        <Iconify
          icon="streamline:delete-1-solid"
          fontSize={20}
          onClick={() => setDisplaypreview(false)}
          sx={{
            position: "absolute",
            top: 14,
            right: 12,
            color: "black",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      </Box>

      <Stack justifyContent="center" alignItems="center" mt={10}>
        {selectedImage ? (
          <ZoomImage
            {...{
              src: selectedImage.src,
              alt: selectedImage.alt,
              label: selectedImage.label,
            }}
          />
        ) : (
          <CircularProgress />
        )}
      </Stack>

      <Stack justifyContent="center" alignItems="center" mb={2}>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            borderRadius: 2,
          }}
        >
          {images && (
            <Tooltip title="Previous" placement="bottom">
              <Iconify
                icon="ic:outline-arrow-left"
                fontSize={32}
                sx={{ cursor: "pointer" }}
                onClick={handlePrevious}
              />
            </Tooltip>
          )}

          <Tooltip title="Zoom out" placement="bottom">
            <Iconify
              icon="ic:sharp-zoom-out"
              fontSize={24}
              sx={{ cursor: "pointer" }}
              onClick={zoomOut}
            />
          </Tooltip>

          <Tooltip title="Zoom in" placement="bottom">
            <Iconify
              icon="ic:sharp-zoom-in"
              fontSize={24}
              sx={{ cursor: "pointer" }}
              onClick={zoomIn}
            />
          </Tooltip>

          <Tooltip title="Download" placement="bottom">
            <Iconify
              icon="ic:outline-file-download"
              fontSize={24}
              sx={{ cursor: "pointer" }}
              onClick={handleDownload}
            />
          </Tooltip>

          {images && (
            <Tooltip title="Next" placement="bottom">
              <Iconify
                icon="ic:outline-arrow-right"
                fontSize={32}
                sx={{ cursor: "pointer" }}
                onClick={handleNext}
              />
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

type PreviewModalProps = {
  previewImage: PreviewImage;
  images?: PreviewImage[];
  setDisplaypreview: Dispatch<SetStateAction<boolean>>;
};

export default PreviewModal;
