import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';

export default interface ThumbnailListConfigurationInterface<T> {
  sortBy?: keyof T;
  sortAscending?: boolean;
  tag?: keyof T;
}

export const defaultConfiguration: ThumbnailListConfigurationInterface<ThumbnailListItemInterface> = {
  sortBy: 'id',
  sortAscending: true,
  tag: 'id',
};
