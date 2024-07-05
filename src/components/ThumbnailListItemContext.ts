import React, { createContext, useContext } from 'react';
import { ThumbnailListItemInterface } from '../interfaces/ThumbnailListItemInterface';
import { ConditionFunction } from '../utils/arrayHelper';

type ThumbnailListItemContextType<T> = {
  items: ThumbnailListItemInterface[];
  setItems: React.Dispatch<React.SetStateAction<ThumbnailListItemInterface[]>>;
  originalItems: T[];
  setOriginalItems: React.Dispatch<React.SetStateAction<T[]>>;
  tagFilterCallback: React.Dispatch<
    React.SetStateAction<{
      tag: string;
      condition: ConditionFunction<any> | undefined;
    }>
  >;
  tagAndCondition: {
    tag: string;
    condition: ConditionFunction<any> | undefined;
  };
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
  sortAscending: boolean;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
};

export const ThumbnailListItemContext = createContext<ThumbnailListItemContextType<any> | undefined>(undefined);

export const useThumbnailListItemContext = <T>(): ThumbnailListItemContextType<T> => {
  const context = useContext(ThumbnailListItemContext);

  if (!context) {
    throw new Error('no context provider available');
  }

  return context as ThumbnailListItemContextType<T>;
};
