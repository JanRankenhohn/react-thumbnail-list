import { Box, Breakpoint, IconButton, Tooltip } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SortIcon from '@mui/icons-material/Sort';
import DropdownInput from './DropdownInput';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import { logDev } from '../utils/logHelper';

/**
 * Sort control component that provides sorting functionality for the thumbnail list.
 * Includes a toggle button for ascending/descending order and a dropdown to select the sort field.
 * 
 * @template T - The type of items in the list
 * @param {ThumbnailListHeaderSortProps<T>} props - Component props
 * @param {Array<{label: string, key: keyof T}>} props.items - Array of sortable field options
 * @param {Breakpoint} [props.muiBreakpoint='md'] - Breakpoint at which the dropdown collapses to an icon
 * @returns {JSX.Element} The rendered sort controls with ascending/descending toggle and field selector
 * 
 * @example
 * ```tsx
 * <ThumbnailList.Header.Sort 
 *   items={[
 *     { label: 'Title', key: 'title' },
 *     { label: 'Date', key: 'date' }
 *   ]} 
 * />
 * ```
 */
function ThumbnailListHeaderSort<T>({
  items,
  muiBreakpoint = 'md',
}: ThumbnailListHeaderSortProps<T>) {
  const { setSortAscending, sortAscending, setSortBy, sortBy } = useThumbnailListItemContext();
  logDev('Header sort rerenders');
  return (
    <>
      <Box sx={{ minWidth: '80px' }}>
        <Tooltip title="asc/desc">
          <IconButton 
            onClick={() => setSortAscending(!sortAscending)}
            aria-label={sortAscending ? "Sort descending" : "Sort ascending"}
          >
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
};

export default ThumbnailListHeaderSort;
