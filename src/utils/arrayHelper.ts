import { logDev } from './logHelper';

/**
 * Generic method that sorts an array of items based on an item key
 * @param values The array that should be sorted
 * @param orderType The key of the entity that the array should be sorted by
 * @returns A new reference of the ordered array
 */
export function orderByArray<T>(values: T[], orderType: keyof T): T[] {
  return [...values].sort((a, b) => {
    const valueA = getComparableValue(a[orderType]);
    const valueB = getComparableValue(b[orderType]);

    return compareValues(valueA, valueB);
  });
}

function getComparableValue(value: unknown): string | number {
  if (typeof value === 'number') {
    return value;
  } else {
    return String(value);
  }
}

function compareValues(a: string | number, b: string | number): number {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  } else {
    return a < b ? -1 : a > b ? 1 : 0;
  }
}

/**
 * Function type for filtering array items based on a custom condition.
 * 
 * @template T - The type of value to be evaluated
 * @param {T} value - The value to evaluate
 * @returns {boolean} True if the value passes the condition, false otherwise
 */
export type ConditionFunction<T> = (value: T) => boolean;

/**
 * Filters an array of items based on a tag property and optional condition function.
 * If no condition is provided, items are filtered based on the truthiness of the tag value.
 * 
 * @template T - The type of items in the array
 * @param {T[]} array - The array to filter
 * @param {keyof T} tagType - The property key to use for filtering
 * @param {ConditionFunction<T[keyof T]>} [condition] - Optional condition function to apply to tag values
 * @returns {T[]} A new array containing only items that pass the filter
 */
export function filterByTag<T>(array: T[], tagType: keyof T, condition?: ConditionFunction<T[keyof T]>): T[] {
  const filteredArray = array.filter((item) => {
    const tagValue = item[tagType];
    return condition ? condition(tagValue) : !!tagValue;
  });

  logDev('filter array');
  logDev(filteredArray);
  return [...filteredArray];
}
