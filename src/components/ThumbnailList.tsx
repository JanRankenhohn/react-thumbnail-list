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
import ThumbnailListConfigurationInterface from '../config/ThumbnailListConfiguration';
import { defaultConfiguration } from '../config/ThumbnailListConfiguration';

/**
 * Main Component: Renders all sub components
 * Includes ThumbnailList Provider for context data
 * @param props react children, items
 * @returns component
 */
const useThumbnailList = <T extends ThumbnailListItemInterface>(
  items: T[],
  config?: ThumbnailListConfigurationInterface<T>
) => {
  const combinedConfig = {
    ...defaultConfiguration,
    ...config, // This will override the defaults with any props that are not undefined
  };

  const ThumbnailList = function (props: ThumbnailListProps) {
    const [listItems, setListItems] = useState(items);
    const { sortedItems, setSortBy, setSortAscending, sortAscending } = useSortedThumbnailListItems(
      listItems,
      combinedConfig.sortBy.toString(),
      false
    );
    const { tagFilteredItems, setTagAndCondition, tagAndCondition } = useTagFilteredThumbnailListItems<
      (typeof listItems)[0]
    >({ allItems: sortedItems, initialTag: combinedConfig.tag.toString() });
    const { setSearchTerm, filteredItems } = useFilteredThumbnailListItems(tagFilteredItems);

    console.log('Thumbnaillist renders');
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
            sortBy: combinedConfig.sortBy.toString(),
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

  return ThumbnailList;
};

type ThumbnailListProps = {
  children: ReactNode;
};

export default useThumbnailList;
