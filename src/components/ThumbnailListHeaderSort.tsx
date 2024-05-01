import { Box, Breakpoint, IconButton, Tooltip } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SortIcon from '@mui/icons-material/Sort';
import DropdownInput from './DropdownInput';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';

function ThumbnailListHeaderSort<T>(props: ThumbnailListHeaderSortProps<T>) {
  const { setSortAscending, sortAscending, setSortBy, sortBy } = useThumbnailListItemContext();
  console.log('Header sort rerenders');
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
          collapseBreakpoint={props.muiBreakpoint}
          label={'sort'}
          defaultValue={sortBy}
          icon={
            <Tooltip title={'sort'}>
              <SortIcon />
            </Tooltip>
          }
          items={props.items.map((i) => {
            return { name: i.label, value: i.key.toString() };
          })}
          onChangeCallback={(value: string) => setSortBy(value)}
        />
      </Box>
    </>
  );
}

ThumbnailListHeaderSort.defaultProps = {
  align: 'start',
  muiBreakpoint: 'md',
};

type ThumbnailListHeaderSortProps<T> = {
  items: { label: string; key: keyof T }[];
  muiBreakpoint: Breakpoint;
  align: AlignType;
};

export default ThumbnailListHeaderSort;
