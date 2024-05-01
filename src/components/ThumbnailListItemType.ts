import { ReactNode } from 'react';

export type ThumbnailListItemType = {
  id: string;
  title: ReactNode;
  subTitle: ReactNode;
  thumbnailUrl: string;
  link: string;
  label: ReactNode;
};
