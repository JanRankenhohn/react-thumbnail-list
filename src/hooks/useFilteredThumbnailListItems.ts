// import { useState, useEffect } from 'react';
// import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';

// /**
//  * Filters a list of event by a search term
//  * @param allEvents event list that will be formatted
//  * @param initialSearchTerm
//  * @returns
//  */
// const useFilteredThumbnailListItems = (allItems: ThumbnailListItemInterface[], initialSearchTerm = '') => {
//   const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
//   const [filteredItems, setFilteredItems] = useState(allItems);

//   useEffect(() => {
//     const filterEvents = () => {
//       const filtered = [...allItems].filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
//       setFilteredItems(filtered);
//     };

//     filterEvents();
//   }, [allItems, searchTerm]);
//   return { searchTerm, setSearchTerm, filteredItems };
// };

// export default useFilteredThumbnailListItems;

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
    console.log('search filter');
    return filtered;
  }, [allItems, searchTerm]);

  return { searchTerm, setSearchTerm, filteredItems };
};

export default useFilteredThumbnailListItems;
