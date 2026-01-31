import { useState, useMemo } from 'react';
import { ConditionFunction, filterByTag } from '../utils/arrayHelper';

/**
 * Props for the useTagFilteredThumbnailListItems hook.
 * 
 * @template T - The type of items in the array
 * @property {T[]} allItems - Array of all items to filter
 * @property {string} initialTag - Initial property key to filter by
 * @property {ConditionFunction<any>} [initialCondition] - Optional initial filter condition function
 */
type UseTagFilteredThumbnailListItemsProps<T> = {
  allItems: T[];
  initialTag: string;
  initialCondition?: ConditionFunction<any>;
};

/**
 * React hook that filters thumbnail list items based on a tag property and optional condition.
 * Special case: when tag is 'id', returns all items without filtering.
 * 
 * @template T - The type of items in the array
 * @param {UseTagFilteredThumbnailListItemsProps<T>} props - Hook configuration
 * @param {T[]} props.allItems - Array of all items to filter
 * @param {string} props.initialTag - Initial property key to filter by
 * @param {ConditionFunction<any>} [props.initialCondition] - Optional initial filter condition
 * @returns {Object} Hook return values
 * @returns {Object} returns.tagAndCondition - Current tag and condition configuration
 * @returns {function} returns.setTagAndCondition - Function to update both tag and condition
 * @returns {T[]} returns.tagFilteredItems - Filtered array of items
 * @returns {function} returns.setTagWithCondition - Helper function to set tag with condition
 * 
 * @example
 * ```tsx
 * const { tagFilteredItems, setTagAndCondition } = useTagFilteredThumbnailListItems({
 *   allItems: items,
 *   initialTag: 'status',
 *   initialCondition: (val) => val === 'active'
 * });
 * ```
 */
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
