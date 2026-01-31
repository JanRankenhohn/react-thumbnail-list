import { Box, Breakpoint, IconButton, Tooltip } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SortIcon from '@mui/icons-material/Sort';
import DropdownInput from './DropdownInput';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import { logDev } from '../utils/logHelper';
import { AlignType } from '../types/AlignType';

function ThumbnailListHeaderSort<T>({
  items,
  muiBreakpoint = 'md',
  align = 'start',
}: ThumbnailListHeaderSortProps<T>) {
  const { setSortAscending, sortAscending, setSortBy, sortBy } = useThumbnailListItemContext();
  logDev('Header sort rerenders');
  return (
    <>
      <Box sx={{ minWidth: '80px' }}>
        <Tooltip title="asc/desc">
          <IconButton onClick={() => setSortAscending(!sortAscending)}>
            <SwapVertIcon />
          </IconButton>
        </Tooltip>
        <DropdownInput
          width="130px"
          collapseBreakpoint={muiBreakpoint}
          label={'sort'}
          defaultValue={sortBy}
          icon={
            <Tooltip title={'sort'}>
              <SortIcon />
            </Tooltip>
          }
          items={items.map((i) => {
            return { name: i.label, value: i.key.toString() };
          })}
          onChangeCallback={(value: string) => setSortBy(value)}
        />
      </Box>
    </>
  );
}

type ThumbnailListHeaderSortProps<T> = {
  items: { label: string; key: keyof T }[];
  muiBreakpoint?: Breakpoint;
  align?: AlignType;
};

export default ThumbnailListHeaderSort;
