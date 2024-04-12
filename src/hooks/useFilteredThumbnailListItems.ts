import { useState, useMemo } from 'react';
import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';

/**
 * Filters a list of event by a search term
 * @param allEvents event list that will be formatted
 * @param initialSearchTerm
 * @returns
 */
const useFilteredThumbnailListItems = (allItems: ThumbnailListItemInterface[], initialSearchTerm = '') => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const filteredItems = useMemo(() => {
    const filtered = [...allItems].filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return filtered;
  }, [allItems, searchTerm]);

  return { searchTerm, setSearchTerm, filteredItems };
};

export default useFilteredThumbnailListItems;
