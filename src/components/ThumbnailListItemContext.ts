import React, { createContext, useContext } from 'react';
import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';
import { ConditionFunction } from '../utils/arrayHelper';

/**
 * Type definition for the ThumbnailList context values.
 * Provides state and state setters for managing the thumbnail list behavior.
 * 
 * @template T - The type of items in the list
 * @property {ThumbnailListItemInterface[]} items - Currently displayed items after filtering and sorting
 * @property {function} setItems - Function to update the displayed items
 * @property {T[]} originalItems - Original unfiltered items
 * @property {function} setOriginalItems - Function to update the original items
 * @property {function} tagFilterCallback - Callback to set the tag filter and condition
 * @property {Object} tagAndCondition - Current tag filter configuration
 * @property {function} setSearchTerm - Function to update the search term
 * @property {function} setSortAscending - Function to toggle sort direction
 * @property {boolean} sortAscending - Current sort direction
 * @property {string} sortBy - Current property being sorted by
 * @property {function} setSortBy - Function to change the sort property
 * @property {boolean} isLoading - Loading state indicator
 */
type ThumbnailListItemContextType<T> = {
  items: ThumbnailListItemInterface[];
  setItems: React.Dispatch<React.SetStateAction<ThumbnailListItemInterface[]>>;
  originalItems: T[];
  setOriginalItems: React.Dispatch<React.SetStateAction<T[]>>;
  tagFilterCallback: React.Dispatch<
    React.SetStateAction<{
      tag: string;
      condition: ConditionFunction<unknown> | undefined;
    }>
  >;
  tagAndCondition: {
    tag: string;
    condition: ConditionFunction<unknown> | undefined;
  };
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
  sortAscending: boolean;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
};

/**
 * React context for sharing thumbnail list state across components.
 * Provides access to items, sorting, filtering, and search functionality.
 */
export const ThumbnailListItemContext = createContext<ThumbnailListItemContextType<unknown> | undefined>(undefined);

/**
 * React hook to access the ThumbnailList context.
 * Must be used within a ThumbnailList component tree.
 * 
 * @template T - The type of items in the list
 * @returns {ThumbnailListItemContextType<T>} The context values
 * @throws {Error} Throws error if used outside of ThumbnailList provider
 * 
 * @example
 * ```tsx
 * const { items, setSearchTerm, sortAscending } = useThumbnailListItemContext();
 * ```
 */
export const useThumbnailListItemContext = <T>(): ThumbnailListItemContextType<T> => {
  const context = useContext(ThumbnailListItemContext);

  if (!context) {
    throw new Error('no context provider available');
  }

  return context as ThumbnailListItemContextType<T>;
};
