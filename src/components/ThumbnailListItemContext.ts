/* eslint-disable @typescript-eslint/no-explicit-any */
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
};

export const ThumbnailListItemContext = createContext<ThumbnailListItemContextType<any> | undefined>(undefined);

// Create a custom hook to consume the context
export const useThumbnailListItemContext = <T>(): ThumbnailListItemContextType<T> => {
  const context = useContext(ThumbnailListItemContext);

  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }

  return context as ThumbnailListItemContextType<T>;
};
