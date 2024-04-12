import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';

export default interface ThumbnailListConfigurationInterface<T> {
  sortBy?: keyof T;
  tag?: keyof T;
}

export const defaultConfiguration: ThumbnailListConfigurationInterface<ThumbnailListItemInterface> = {
  sortBy: 'id',
  tag: 'id',
};
