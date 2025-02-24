import Box from "@mui/material/Box";
import { FC, useState } from "react";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Iconify from "./iconify";
import { PreviewImage } from "@/types";
import PreviewModal from "./previewModal";

const ImagePreview: FC<ImagePreviewProps> = ({ label, alt, src, images }) => {
  const [displayPreview, setDisplaypreview] = useState(false);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Image src={src} alt={alt ?? label ?? "preview image"} fill />

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            position: "absolute",
            bottom: 1,
            right: 1,
            width: 30,
            height: 30,
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(4px)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              transform: "scale(0.95)",
            },
          }}
          onClick={() => setDisplaypreview(true)}
        >
          <Iconify icon="ci:expand" fontSize={30} />
        </Stack>
      </Box>

      {displayPreview && (
        <PreviewModal
          {...{ previewImage: { label, src, alt }, images, setDisplaypreview }}
        />
      )}
    </>
  );
};

type ImagePreviewProps = PreviewImage & {
  images?: PreviewImage[];
};

export default ImagePreview;
