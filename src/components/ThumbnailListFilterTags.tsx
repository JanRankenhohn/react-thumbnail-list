import ThumbnailListFilterTag from './ThumbnailListFilterTag';
import {ThumbnailListItemTagType} from '../types/ThumbnailListItemTagType';
import {useThumbnailListItemContext} from './ThumbnailListItemContext';
import {Breakpoint} from '@mui/material';

export default function ThumbnailListFilterTags(props: ThumbnailListFilterTagsProps) {
  const {tagFilterCallback, tagAndCondition} = useThumbnailListItemContext();

  return (
    <>
      {props.tags.map((tag: ThumbnailListItemTagType) => {
        return (
          <ThumbnailListFilterTag
            label={tag.label}
            value={tag.value}
            variant={tagAndCondition.tag === tag.value ? 'filled' : 'outlined'}
            collapseBreakpoint={props.collapseBreakpoint}
            onClickCallback={(value: string) => tagFilterCallback({tag: value, condition: tag.condition})}
            icon={tag.icon}
          />
        );
      })}
    </>
  );
}


type ThumbnailListFilterTagsProps = {
  tags: ThumbnailListItemTagType[],
  collapseBreakpoint: Breakpoint,
}
