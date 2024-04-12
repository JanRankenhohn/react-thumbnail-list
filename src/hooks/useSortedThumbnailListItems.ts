import { useState, useMemo } from 'react';
import { orderByArray } from '../utils/arrayHelper';

const useSortedThumbnailListItems = <T>(allItems: T[], initialSortBy: string, initialSortAscending: boolean) => {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortAscending, setSortAscending] = useState(initialSortAscending);

  const sortedItems = useMemo(() => {
    let sorted = orderByArray(allItems, sortBy as keyof T);
    if (!sortAscending) {
      sorted = sorted.reverse();
    }
    return sorted;
  }, [allItems, sortBy, sortAscending]);

  return { sortBy, sortAscending, setSortBy, setSortAscending, sortedItems };
};

export default useSortedThumbnailListItems;
