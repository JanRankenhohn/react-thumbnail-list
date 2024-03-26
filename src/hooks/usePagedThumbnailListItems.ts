import { useState, useEffect } from 'react';
import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';

/**
 * Pages a list of event by paging number
 * @param allEvents event list that will be formatted
 * @param initialPagingNumber
 * @returns
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
