// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {useState, useEffect} from 'react';
// import {ThumbnailListItemType} from '../ThumbnailListItemType';
// import {ConditionFunction, filterByTag} from '../utils/arrayHelper';
// import {ThumbnailListItemInterface} from '../interfaces/ThumbnailListItemInterface';

// const useTagFilteredItems = (allItems: ThumbnailListItemInterface[], initialTag: string = 'id', initialCondition?: ConditionFunction<any>) => {
//   const [tagAndCondition, setTagAndCondition] = useState({tag: initialTag, condition: initialCondition});
//   const [tagFilteredItems, setTagFilteredItems] = useState(allItems);

//   const setTagWithCondition = (t: keyof ThumbnailListItemType, c: (value: any) => boolean) => {
//     setTagAndCondition({tag: t, condition: c});
//   };

//   useEffect(() => {
//     const tagFiltered = tagAndCondition.tag === 'id' ? allItems : filterByTag(allItems, tagAndCondition.tag as keyof ThumbnailListItemType, tagAndCondition.condition);
//     setTagFilteredItems(tagFiltered);
//   }, [allItems, tagAndCondition, initialTag, initialCondition]);

//   return {tagAndCondition, setTagAndCondition, tagFilteredItems, setTagWithCondition};
// };

// export default useTagFilteredItems;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from 'react';
import { ConditionFunction, filterByTag } from '../utils/arrayHelper';

type UseTagFilteredThumbnailListItemsProps<T> = {
  allItems: T[];
  initialTag: string;
  initialCondition?: ConditionFunction<any>;
};

const useTagFilteredThumbnailListItems = <T>({
  allItems,
  initialTag,
  initialCondition,
}: UseTagFilteredThumbnailListItemsProps<T>) => {
  const [tagAndCondition, setTagAndCondition] = useState({ tag: initialTag, condition: initialCondition });

  const setTagWithCondition = (t: string, c: (value: any) => boolean) => {
    setTagAndCondition({ tag: t, condition: c });
  };

  const tagFilteredItems = useMemo(() => {
    const tagFiltered =
      tagAndCondition.tag === 'id'
        ? allItems
        : filterByTag(allItems, tagAndCondition.tag as keyof T, tagAndCondition.condition);
    console.log('tag filter');
    return tagFiltered;
  }, [allItems, tagAndCondition]);

  return {
    tagAndCondition,
    setTagAndCondition,
    tagFilteredItems,
    setTagWithCondition,
  };
};

export default useTagFilteredThumbnailListItems;
