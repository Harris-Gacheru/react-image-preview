import { ImagePreviewProps } from "@/components/imagePreview";
import { PreviewModalProps } from "@/components/previewModal";

declare module "react-image-preview" {
  export const ImagePreview: React.FC<ImagePreviewProps>;
  export const PreviewModal: React.FC<PreviewModalProps>;
}
