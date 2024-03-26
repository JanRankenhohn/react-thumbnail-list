import { ReactNode } from 'react';

export interface ThumbnailListItemInterface {
  id: string;
  title: string;
  subTitle: ReactNode;
  thumbnailUrl: string;
  link: string;
  label: ReactNode;
}
