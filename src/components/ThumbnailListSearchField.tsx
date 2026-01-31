import React, { useCallback, useEffect, useState } from 'react';
import { Box, FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import { debounce } from 'lodash';
import { logDev } from '../utils/logHelper';

const ThumbnailListSearchField = () => {
  const [input, setInput] = useState('');
  const [showClearIcon, setShowClearIcon] = useState('hidden');
  const { setSearchTerm } = useThumbnailListItemContext();
  logDev('Searchfield rerenders');

  const handleChange = (value: string): void => {
    setInput(value);
    setShowClearIcon(value === '' ? 'hidden' : '');
  };

  const debouncedSetSearchTerm = useCallback(debounce(setSearchTerm, 50), []);
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleChange('')} sx={{ visibility: showClearIcon, padding: 0 }}>
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
