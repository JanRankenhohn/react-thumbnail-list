// Main component export
export { default as ThumbnailList } from './components/ThumbnailList';

// Essential types that consumers need to use the component
export type { ThumbnailListItemInterface } from './interfaces/ThumbnailListItemInterface';
export type { default as ThumbnailListConfigurationInterface } from './config/ThumbnailListConfiguration';

// Types needed for advanced features (FilterTags)
export type { ThumbnailListItemTagType } from './components/ThumbnailListFilterTags';
export type { ConditionFunction } from './utils/arrayHelper';
