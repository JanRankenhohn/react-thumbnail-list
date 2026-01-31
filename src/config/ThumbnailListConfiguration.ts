import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';

/**
 * Configuration interface for ThumbnailList component.
 * Defines initial sorting and filtering behavior for the list.
 * 
 * @interface ThumbnailListConfigurationInterface
 * @template T - The type of items in the list (must extend ThumbnailListItemInterface)
 * @property {keyof T} [sortBy] - The property key to sort items by
 * @property {boolean} [sortAscending] - Whether to sort in ascending order (true) or descending (false)
 * @property {keyof T} [tag] - The property key used for tag-based filtering
 */
export default interface ThumbnailListConfigurationInterface<T> {
  sortBy?: keyof T;
  sortAscending?: boolean;
  tag?: keyof T;
}

/**
 * Default configuration values for ThumbnailList.
 * Items are sorted by 'id' in ascending order by default.
 */
export const defaultConfiguration: ThumbnailListConfigurationInterface<ThumbnailListItemInterface> = {
  sortBy: 'id',
  sortAscending: true,
  tag: 'id',
};
