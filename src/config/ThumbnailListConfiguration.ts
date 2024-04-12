import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';
import BreakpointType from '../types/BreakpointType';

export default interface ThumbnailListConfigurationInterface<T> {
  sortBy?: keyof T;
  muiBreakpoints?: BreakpointType;
}

export const defaultConfiguration: ThumbnailListConfigurationInterface<ThumbnailListItemInterface> = {
  sortBy: 'id',
  muiBreakpoints: { xs: 12, sm: 6, md: 6, lg: 4, xl: 3 },
};
