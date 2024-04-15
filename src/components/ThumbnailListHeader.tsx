import { Stack } from '@mui/material';
import React, { Children, ReactNode } from 'react';
import ThumbnailListSearchField from './ThumbnailListSearchField';
import useThumbnailListHeaderSort from './ThumbnailListHeaderSort';
import useThumbnailListFilterTags from './ThumbnailListFilterTags';

function ThumbnailListHeader<T>(props: ThumbnailListHeaderProps<T>) {
const useTHumbnailListHeader = <T,>() => {
  const ThumbnailListHeader = function (props: ThumbnailListHeaderProps) {
    const startAlignedItems = [];
    const endAlignedItems = [];

    // Iterate through each child to categorize them based on their 'align' prop
    Children.forEach(props.children, (child) => {
      if (React.isValidElement(child)) {
        const alignment = child.props.align || 'start';
        if (alignment === 'end') {
          endAlignedItems.push(child);
        } else {
          startAlignedItems.push(child);
        }
      }
    });

    return (
      <>
        <Stack direction="row" alignItems="center" justifyContent={props.justifyContent ?? 'space-between'} gap={2}>
          <Stack direction="row" alignItems="center" gap={2} justifyContent="start">
            {startAlignedItems}
          </Stack>
          {endAlignedItems}
        </Stack>
      </>
    );
  };

  ThumbnailListHeader.SearchField = ThumbnailListSearchField;
  ThumbnailListHeader.FilterTags = useThumbnailListFilterTags<T>();
  ThumbnailListHeader.Sort = useThumbnailListHeaderSort<T>();

  return ThumbnailListHeader;
};

type ThumbnailListHeaderProps = {
  children: ReactNode;
  justifyContent?: 'start' | 'center' | 'end' | 'space-between';
};

export default useTHumbnailListHeader;
