import { useState, useMemo } from 'react';
import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';

/**
 * React hook that filters thumbnail list items based on a search term.
 * Performs case-insensitive search against item titles and memoizes results for performance.
 * 
 * @param {ThumbnailListItemInterface[]} allItems - Array of all items to filter
 * @param {string} [initialSearchTerm=''] - Initial search term value
 * @returns {Object} Hook return values
 * @returns {string} returns.searchTerm - Current search term
 * @returns {function} returns.setSearchTerm - Function to update the search term
 * @returns {ThumbnailListItemInterface[]} returns.filteredItems - Items matching the search term
 * 
 * @example
 * ```tsx
 * const { searchTerm, setSearchTerm, filteredItems } = useFilteredThumbnailListItems(items);
 * ```
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
