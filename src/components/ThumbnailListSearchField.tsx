import React, { useEffect, useMemo, useState } from 'react';
import { Box, FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import { debounce } from 'lodash';
import { logDev } from '../utils/logHelper';

/**
 * Search field component for filtering thumbnail list items.
 * Includes a search icon, text input, and clear button. Search is debounced for performance.
 * The component is memoized to prevent unnecessary re-renders.
 * 
 * @returns {JSX.Element} The rendered search field with icons and clear functionality
 * 
 * @example
 * ```tsx
 * <ThumbnailList.Header>
 *   <ThumbnailList.Header.SearchField />
 * </ThumbnailList.Header>
 * ```
 */
const ThumbnailListSearchField = () => {
  const [input, setInput] = useState('');
  const [showClearIcon, setShowClearIcon] = useState('hidden');
  const { setSearchTerm } = useThumbnailListItemContext();
  logDev('Searchfield rerenders');

  // Create debounced function that's stable across renders unless setSearchTerm changes
  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 250),
    [setSearchTerm]
  );

  const handleChange = (value: string): void => {
    setInput(value);
    setShowClearIcon(value === '' ? 'hidden' : '');
  };

  useEffect(() => {
    debouncedSetSearchTerm(input);
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [input, debouncedSetSearchTerm]);

  return (
    <Box sx={{ marginLeft: 'auto' }}>
      <FormControl>
        <TextField
          fullWidth
          value={input}
          size="small"
          variant="outlined"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
          aria-label="Search thumbnails"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  onClick={() => handleChange('')} 
                  sx={{ visibility: showClearIcon, padding: 0 }}
                  aria-label="Clear search"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Box>
  );
};

export default React.memo(ThumbnailListSearchField);
