import { ReactNode } from 'react';

/**
 * Interface representing a thumbnail list item.
 * This is the base interface that all items displayed in the ThumbnailList must implement.
 * 
 * @interface ThumbnailListItemInterface
 * @property {string} id - Unique identifier for the item
 * @property {string} title - Primary title text displayed for the item
 * @property {ReactNode} [subTitle] - Optional secondary text displayed below the title
 * @property {string} thumbnailUrl - URL of the thumbnail image to display
 * @property {function} [onClick] - Optional callback function triggered when item is clicked
 * @property {ReactNode} [label] - Optional label content displayed in the info section
 */
export interface ThumbnailListItemInterface {
  id: string;
  title: string;
  subTitle?: ReactNode;
  thumbnailUrl: string;
  onClick?: (id: string) => any;
  label?: ReactNode;
}
