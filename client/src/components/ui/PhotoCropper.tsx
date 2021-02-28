import React from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

type Props = {
  image: string;
  setCropper: (cropper: Cropper) => void;
  className: string;
};

const PhotoCropper = ({ image, setCropper, className }: Props) => {
  return (
    <Cropper
      src={image}
      className={className}
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
