import { logDev } from '../utils/logHelper';
import ThumbnailListFilterTag from './ThumbnailListFilterTag';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import { Breakpoint } from '@mui/material';
import { ReactNode } from 'react';

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
