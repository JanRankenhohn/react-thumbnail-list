import { styled } from '@mui/material';
import { ReactNode } from 'react';

/**
 * Can be used as parent component to crop a wrapped image
 * @param props width: width for cropping
 * height: height for cropping
 * seperate xs and sm values for mui breakpoints
 * @returns component
 */
export default function ImageCropper(props: ImageCropperProps) {
  const ThumbnailImageCrop = styled('div')((p) => ({
    [p.theme.breakpoints.up('xs')]: {
      minWidth: props.width.xs,
      maxWidth: props.width.xs,
      height: props.height.xs,
      overflow: 'hidden',
    },
    [p.theme.breakpoints.up('sm')]: {
      minWidth: props.width.sm,
      maxwWidth: props.width.sm,
      height: props.height.sm,
    },
  }));

  return (
    <>
      <ThumbnailImageCrop>{props.children}</ThumbnailImageCrop>
    </>
  );
}

type ImageCropperProps = {
  width: { xs: string; sm: string };
  height: { xs: string; sm: string };
  children: ReactNode;
};
