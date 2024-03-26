// import { useState, useEffect, useMemo } from 'react';
// import { orderByArray } from '../utils/arrayHelper';

// const useSortedThumbnailListItems = <T>(allItems: T[], initialSortBy: string, initialSortAscending: boolean) => {
//   const [sortBy, setSortBy] = useState(initialSortBy);
//   const [sortAscending, setSortAscending] = useState(initialSortAscending);
//   const [sortedItems, setSortedItems] = useState(allItems);

//   useMemo(() => {
//     let sorted = orderByArray(allItems, sortBy as keyof T);
//     if (!sortAscending) {
//       sorted = sorted.reverse();
//     }
//     setSortedItems(sorted);
//   }, [allItems, sortBy, sortAscending, initialSortBy, initialSortAscending]);

//   return { sortBy, sortAscending, setSortBy, setSortAscending, sortedItems };
// };

// export default useSortedThumbnailListItems;

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
    console.log('sort filter');
    return sorted;
  }, [allItems, sortBy, sortAscending]);

  return { sortBy, sortAscending, setSortBy, setSortAscending, sortedItems };
};

export default useSortedThumbnailListItems;
