/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import ThumbnailListMainContent from './ThumbnailListMainContent';
import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';
import { ThumbnailListItemContext } from './ThumbnailListItemContext';
import useTagFilteredThumbnailListItems from '../hooks/useTagFilteredThumbnailListItems';
import useFilteredThumbnailListItems from '../hooks/useFilteredThumbnailListItems';
import useSortedThumbnailListItems from '../hooks/useSortedThumbnailListItems';
import useTHumbnailListHeader from './ThumbnailListHeader';

/**
 * Main Component: Renders all sub components
 * Includes ThumbnailList Provider for context data
 * @param props react children, items
 * @returns component
 */
const useThumbnailList = <T extends ThumbnailListItemInterface>(items: T[], sortBy: string = 'id') => {
  const ThumbnailList = function (props: ThumbnailListProps) {
    const [listItems, setListItems] = useState(items);
    const { sortedItems, setSortBy, setSortAscending, sortAscending } = useSortedThumbnailListItems(
      listItems,
      sortBy,
      false
    );
    const { tagFilteredItems, setTagAndCondition, tagAndCondition } = useTagFilteredThumbnailListItems<
      (typeof listItems)[0]
    >({ allItems: sortedItems, initialTag: 'id' });
    const { setSearchTerm, filteredItems } = useFilteredThumbnailListItems(tagFilteredItems);

    console.log('list items debug');
    console.log(sortedItems);

    useEffect(() => {
      if (items) {
        setListItems(items);
      }
    }, [items]);

    return (
      <>
        <ThumbnailListItemContext.Provider
          value={{
            items: filteredItems,
            setItems: setListItems,
            originalItems: listItems,
            setOriginalItems: setListItems,
            tagFilterCallback: setTagAndCondition,
            tagAndCondition: tagAndCondition,
            setSearchTerm: setSearchTerm,
            setSortAscending: setSortAscending,
            sortAscending: sortAscending,
            setSortBy: setSortBy,
          }}
        >
          <Stack direction="column" gap={2} sx={{ width: '100%', minWidth: '425px' }}>
            {props.children}
          </Stack>
        </ThumbnailListItemContext.Provider>
      </>
    );
  };

  ThumbnailList.MainContent = ThumbnailListMainContent;
  ThumbnailList.Header = useTHumbnailListHeader<T>();

  ThumbnailList.defaultProps = {
    sortBy: 'Id',
  };

  return ThumbnailList;
};

type ThumbnailListProps = {
  children: ReactNode;
  // items: ThumbnailListItemInterface[];
  // sortBy: string;
};

export default useThumbnailList;
