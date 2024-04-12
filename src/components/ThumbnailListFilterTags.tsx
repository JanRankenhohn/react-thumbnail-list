import ThumbnailListFilterTag from './ThumbnailListFilterTag';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import { Breakpoint } from '@mui/material';
import { ReactNode } from 'react';

const useThumbnailListFilterTags = <T,>() => {
  const ThumbnailListFilterTags = (props: ThumbnailListFilterTagsProps<T>) => {
    const { tagFilterCallback, tagAndCondition } = useThumbnailListItemContext();

    return (
      <>
        {props.tags.map((tag: ThumbnailListItemTagType<T>) => {
          return (
            <ThumbnailListFilterTag
              label={tag.label}
              value={tag.value.toString()}
              variant={tagAndCondition.tag === tag.value ? 'filled' : 'outlined'}
              collapseBreakpoint={props.collapseBreakpoint}
              onClickCallback={(value: string) => tagFilterCallback({ tag: value, condition: tag.condition })}
              icon={tag.icon}
            />
          );
        })}
      </>
    );
  };

  return ThumbnailListFilterTags;
};

export type ThumbnailListItemTagType<T> = {
  label: string;
  value: keyof T;
  icon?: ReactNode;
  condition?: (value: any) => boolean;
};

type ThumbnailListFilterTagsProps<T> = {
  tags: ThumbnailListItemTagType<T>[];
  collapseBreakpoint: Breakpoint;
};

export default useThumbnailListFilterTags;
