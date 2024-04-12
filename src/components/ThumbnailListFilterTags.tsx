import ThumbnailListFilterTag from './ThumbnailListFilterTag';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import { Breakpoint } from '@mui/material';
import { ReactNode } from 'react';

const useThumbnailListFilterTags = <T,>() => {
  const ThumbnailListFilterTags = (props: ThumbnailListFilterTagsProps<T>) => {
    const { tagFilterCallback, tagAndCondition } = useThumbnailListItemContext();

    return (
      <>
        {props.tags.map((tag: ThumbnailListItemTagType<T>, index: number) => {
          return (
            <ThumbnailListFilterTag
              key={`${index}_${tag.key.toString()}`}
              label={tag.label}
              value={tag.key.toString()}
              variant={tagAndCondition.tag === tag.key ? 'filled' : 'outlined'}
              collapseBreakpoint={props.muiCollapseBreakpoint}
              onClickCallback={(value: string) => tagFilterCallback({ tag: value, condition: tag.condition })}
              icon={tag.icon}
            />
          );
        })}
      </>
    );
  };

  ThumbnailListFilterTags.defaultProps = {
    align: 'start',
    muiCollapseBreakpoint: 'md',
  };

  return ThumbnailListFilterTags;
};

export type ThumbnailListItemTagType<T> = {
  label: string;
  key: keyof T;
  icon?: ReactNode;
  condition?: (value: any) => boolean;
};

type ThumbnailListFilterTagsProps<T> = {
  tags: ThumbnailListItemTagType<T>[];
  muiCollapseBreakpoint: Breakpoint;
  align: AlignType;
};

export default useThumbnailListFilterTags;
