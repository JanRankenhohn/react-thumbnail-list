import { useState, useEffect } from 'react';
import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';

/**
 * React hook that provides pagination functionality for thumbnail list items.
 * Automatically slices the items array based on current page and entries per page.
 * 
 * @param {ThumbnailListItemInterface[]} allItems - Array of all items to paginate
 * @param {number} [initialEntriesPerPage=10] - Initial number of items to show per page
 * @param {number} [initialPage=1] - Initial page number (1-indexed)
 * @returns {Object} Hook return values
 * @returns {number} returns.entriesPerPage - Current number of entries per page
 * @returns {function} returns.setEntriesPerPage - Function to update entries per page
 * @returns {number} returns.page - Current page number
 * @returns {function} returns.setPage - Function to change the current page
 * @returns {ThumbnailListItemInterface[]} returns.filteredItems - Items for the current page
 * 
 * @example
 * ```tsx
 * const { page, setPage, entriesPerPage, filteredItems } = 
 *   usePagedThumbnailListItems(items, 20, 1);
 * ```
 */
const usePagedThumbnailListItems = (
  allItems: ThumbnailListItemInterface[],
  initialEntriesPerPage = 10,
  initialPage = 1
) => {
  const [entriesPerPage, setEntriesPerPage] = useState(initialEntriesPerPage);
  const [page, setPage] = useState(initialPage);
  const [filteredItems, setFilteredItems] = useState(allItems);

  useEffect(() => {
    const startIndex = (page - 1) * entriesPerPage;
    if (startIndex >= allItems.length) {
      setFilteredItems([]);
    }
    const endIndex = page * entriesPerPage;
    setFilteredItems(allItems.slice(startIndex, Math.min(endIndex, allItems.length)));
  }, [allItems, entriesPerPage, page]);

  return { entriesPerPage, setEntriesPerPage, page, setPage, filteredItems };
};

export default usePagedThumbnailListItems;
