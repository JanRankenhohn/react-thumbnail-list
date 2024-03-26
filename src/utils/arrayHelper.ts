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
    return a.localeCompare(b, undefined, {sensitivity: 'base'});
  } else {
    return a < b ? -1 : a > b ? 1 : 0;
  }
}

export type ConditionFunction<T> = (value: T) => boolean;

export function filterByTag<T>(array: T[], tagType: keyof T, condition?: ConditionFunction<unknown>): T[] {
  const filteredArray = array.filter((item) => {
    const tagValue = item[tagType];
    return condition ? condition(tagValue) : !!tagValue;
  });

  console.log('filter array');
  console.log(filteredArray);
  return [...filteredArray];
}

