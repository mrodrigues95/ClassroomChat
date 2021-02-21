import React from 'react';
import { Cropper } from 'react-cropper';

type Props = {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
  className: string;
};

const PhotoCropper = ({ imagePreview, setCropper, className }: Props) => {
  return (
    <Cropper
      className={className}
      src={imagePreview}
      initialAspectRatio={1}
      aspectRatio={1}
      autoCropArea={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      background={false}
      responsive={true}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
};

export default PhotoCropper;
