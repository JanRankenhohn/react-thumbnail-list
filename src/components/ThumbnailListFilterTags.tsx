import { logDev } from '../utils/logHelper';
import ThumbnailListFilterTag from './ThumbnailListFilterTag';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import { Breakpoint } from '@mui/material';
import { ReactNode } from 'react';

/**
 * Container component that renders multiple filter tag buttons.
 * Each tag can filter items based on a specific property and optional condition function.
 * 
 * @template T - The type of items in the list
 * @param {ThumbnailListFilterTagsProps<T>} props - Component props
 * @param {ThumbnailListItemTagType<T>[]} props.tags - Array of tag configurations
 * @param {Breakpoint} [props.muiCollapseBreakpoint='md'] - Breakpoint at which tags collapse to icons
 * @returns {JSX.Element} The rendered collection of filter tags
 * 
 * @example
 * ```tsx
 * <ThumbnailList.Header.FilterTags 
 *   tags={[
 *     { label: 'Active', key: 'status', condition: (val) => val === 'active' },
 *     { label: 'Archived', key: 'status', condition: (val) => val === 'archived' }
 *   ]} 
 * />
 * ```
 */
function ThumbnailListFilterTags<T>({
  tags,
  muiCollapseBreakpoint = 'md',
}: ThumbnailListFilterTagsProps<T>) {
  const { tagFilterCallback, tagAndCondition } = useThumbnailListItemContext();

  logDev('filter tags rerenders');

  return (
    <>
      {tags.map((tag: ThumbnailListItemTagType<T>, index: number) => {
        const isActive = tagAndCondition.tag === tag.key.toString() && tagAndCondition.condition === tag.condition;
        return (
          <ThumbnailListFilterTag
            key={`${index}_${tag.key.toString()}`}
            label={tag.label}
            value={tag.key.toString()}
            variant={isActive ? 'filled' : 'outlined'}
            collapseBreakpoint={muiCollapseBreakpoint}
            onClickCallback={(value: string) => tagFilterCallback({ tag: value, condition: tag.condition })}
            icon={tag.icon}
          />
        );
      })}
    </>
  );
}

/**
 * Type definition for a filter tag configuration.
 * Defines how a tag filters items based on a property and optional condition.
 * 
 * @template T - The type of items being filtered
 * @property {string} label - Display text for the tag
 * @property {keyof T} key - Property key to filter by
 * @property {ReactNode} [icon] - Optional icon to display when tag is collapsed
 * @property {function} [condition] - Optional function to evaluate the property value
 */
export type ThumbnailListItemTagType<T> = {
  label: string;
  key: keyof T;
  icon?: ReactNode;
  condition?: (value: any) => boolean;
};

type ThumbnailListFilterTagsProps<T> = {
  tags: ThumbnailListItemTagType<T>[];
  muiCollapseBreakpoint?: Breakpoint;
};

export default ThumbnailListFilterTags;
