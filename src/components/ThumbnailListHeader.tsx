import { Stack } from '@mui/material';
import React, { Children, ReactNode } from 'react';
import ThumbnailListSearchField from './ThumbnailListSearchField';
import ThumbnailListFilterTags from './ThumbnailListFilterTags';
import ThumbnailListHeaderSort from './ThumbnailListHeaderSort';

/**
 * Header component for the ThumbnailList that arranges child components horizontally.
 * Child components can be aligned to 'start' or 'end' using their align prop.
 * 
 * This component uses a compound component pattern with SearchField, FilterTags, and Sort sub-components.
 * 
 * @param {ThumbnailListHeaderProps} props - Component props
 * @param {ReactNode} props.children - Child components to display in the header
 * @param {'start' | 'center' | 'end' | 'space-between'} [props.justifyContent='space-between'] - Flex justification for header layout
 * @returns {JSX.Element} The rendered header component
 * 
 * @example
 * ```tsx
 * <ThumbnailList.Header>
 *   <ThumbnailList.Header.SearchField />
 *   <ThumbnailList.Header.Sort items={sortOptions} />
 * </ThumbnailList.Header>
 * ```
 */
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
    <Stack direction="row" alignItems="center" justifyContent={props.justifyContent ?? 'space-between'} gap={2}>
      <Stack direction="row" alignItems="center" gap={2} justifyContent="start">
        {startAlignedItems}
      </Stack>
      {endAlignedItems}
    </Stack>
  );
};

ThumbnailListHeader.SearchField = ThumbnailListSearchField;
ThumbnailListHeader.FilterTags = ThumbnailListFilterTags;
ThumbnailListHeader.Sort = ThumbnailListHeaderSort;

type ThumbnailListHeaderProps = {
  children: ReactNode;
  justifyContent?: 'start' | 'center' | 'end' | 'space-between';
};

export default ThumbnailListHeader;
