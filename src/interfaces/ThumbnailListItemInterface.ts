import { ReactNode } from 'react';

export interface ThumbnailListItemInterface {
  id: string;
  title: string;
  subTitle?: ReactNode;
  thumbnailUrl: string;
  onClick?: (id: string) => any;
  label?: ReactNode;
}
