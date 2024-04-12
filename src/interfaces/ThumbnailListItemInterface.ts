import { ReactNode } from 'react';

export interface ThumbnailListItemInterface {
  id: string;
  title: string;
  subTitle?: ReactNode;
  thumbnailUrl: string;
  onClick?: string;
  label?: ReactNode;
}
