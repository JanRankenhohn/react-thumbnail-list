import { ReactNode } from 'react';

/**
 * Type definition for a thumbnail list item with link support.
 * Similar to ThumbnailListItemInterface but includes a link property.
 * 
 * @property {string} id - Unique identifier for the item
 * @property {ReactNode} title - Primary title content
 * @property {ReactNode} subTitle - Secondary content displayed below title
 * @property {string} thumbnailUrl - URL of the thumbnail image
 * @property {string} link - URL link associated with the item
 * @property {ReactNode} label - Additional label content
 */
export type ThumbnailListItemType = {
  id: string;
  title: ReactNode;
  subTitle: ReactNode;
  thumbnailUrl: string;
  link: string;
  label: ReactNode;
};
