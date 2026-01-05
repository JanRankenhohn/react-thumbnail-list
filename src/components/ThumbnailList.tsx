import { Stack } from '@mui/material';
import { ReactNode, useState } from 'react';
import ThumbnailListMainContent from './ThumbnailListMainContent';
import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';
import { ThumbnailListItemContext } from './ThumbnailListItemContext';
import useTagFilteredThumbnailListItems from '../hooks/useTagFilteredThumbnailListItems';
import useFilteredThumbnailListItems from '../hooks/useFilteredThumbnailListItems';
import useSortedThumbnailListItems from '../hooks/useSortedThumbnailListItems';
import ThumbnailListConfigurationInterface from '../config/ThumbnailListConfiguration';
import { defaultConfiguration } from '../config/ThumbnailListConfiguration';
import ThumbnailListHeader from './ThumbnailListHeader';
import { logDev } from 'utils/logHelper';

/**
 * Main Component: Renders all sub components
 * Includes ThumbnailList Provider for context data
 * @param props react children, items
 * @returns component
 */
function ThumbnailList<T extends ThumbnailListItemInterface>(props: ThumbnailListProps<T>) {
  const combinedConfig = {
    ...defaultConfiguration,
    ...props.config, // This will override the defaults with any props that are not undefined
  };
  const [listItems, setListItems] = useState(props.items);
  const { sortedItems, setSortBy, setSortAscending, sortAscending } = useSortedThumbnailListItems(
    listItems,
    combinedConfig.sortBy.toString(),
    combinedConfig.sortAscending
  );
  const { tagFilteredItems, setTagAndCondition, tagAndCondition } = useTagFilteredThumbnailListItems<
    (typeof listItems)[0]
  >({ allItems: sortedItems, initialTag: combinedConfig.tag.toString() });
  const { setSearchTerm, filteredItems } = useFilteredThumbnailListItems(tagFilteredItems);

  logDev('Thumbnaillist renders');

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
          isLoading: false,
        }}
      >
        <Stack direction="column" sx={{ width: '100%', minWidth: '425px' }}>
          {props.children}
        </Stack>
      </ThumbnailListItemContext.Provider>
    </>
  );
}

ThumbnailList.MainContent = ThumbnailListMainContent;
ThumbnailList.Header = ThumbnailListHeader;

type ThumbnailListProps<T> = {
  children: ReactNode;
  items: T[];
  config?: ThumbnailListConfigurationInterface<T>;
};

export default ThumbnailList;
