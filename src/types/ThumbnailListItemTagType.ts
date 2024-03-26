/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';

export type ThumbnailListItemTagType = {
  label: string;
  value: string;
  icon?: ReactNode;
  condition?: (value: any) => boolean;
};
