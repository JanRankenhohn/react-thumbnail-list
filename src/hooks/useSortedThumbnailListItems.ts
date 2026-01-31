import { useState, useMemo } from 'react';
import { orderByArray } from '../utils/arrayHelper';

/**
 * React hook that provides sorting functionality for thumbnail list items.
 * Sorts items by a specified property key and supports ascending/descending order.
 * 
 * @template T - The type of items in the array
 * @param {T[]} allItems - Array of all items to sort
 * @param {string} initialSortBy - Initial property key to sort by
 * @param {boolean} initialSortAscending - Whether to initially sort in ascending order
 * @returns {Object} Hook return values
 * @returns {string} returns.sortBy - Current sort property key
 * @returns {boolean} returns.sortAscending - Current sort direction (true for ascending)
 * @returns {function} returns.setSortBy - Function to change the sort property
 * @returns {function} returns.setSortAscending - Function to change the sort direction
 * @returns {T[]} returns.sortedItems - Sorted array of items
 * 
 * @example
 * ```tsx
 * const { sortBy, sortAscending, setSortBy, setSortAscending, sortedItems } = 
 *   useSortedThumbnailListItems(items, 'title', true);
 * ```
 */
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
