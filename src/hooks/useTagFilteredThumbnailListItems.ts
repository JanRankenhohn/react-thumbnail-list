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
