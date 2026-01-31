import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import ThumbnailListItem from './ThumbnailListItem';
import { Box, Grid, LinearProgress, styled } from '@mui/material';
import BreakpointType from '../types/BreakpointType';
import { useMemo } from 'react';
import { logDev } from '../utils/logHelper';

/**
 * Padding percentage used to create responsive card height with fixed aspect ratio.
 * This percentage ensures consistent card dimensions across different screen sizes.
 */
const CARD_ASPECT_RATIO_PADDING = '27.75%';

const RatioWrapper = styled('div')(() => ({
  paddingTop: CARD_ASPECT_RATIO_PADDING,
  position: 'relative',
  width: '100%',
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

/**
 * Main content area that displays the grid of thumbnail items.
 * Handles responsive layout with Material-UI Grid and shows a loading indicator.
 * 
 * @param {ThumbnailListMainContentProps} props - Component props
 * @param {BreakpointType} [props.muiBreakpoints={ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }] - Grid column spans for different screen sizes
 * @param {number} [props.spacing=2] - Spacing between grid items
 * @returns {JSX.Element} The rendered grid of thumbnail items with loading indicator
 * 
 * @example
 * ```tsx
 * <ThumbnailList.MainContent 
 *   spacing={3} 
 *   muiBreakpoints={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} 
 * />
 * ```
 */
export default function ThumbnailListMainContent({
  spacing = 2,
  muiBreakpoints = { xs: 12, sm: 6, md: 6, lg: 4, xl: 3 },
}: ThumbnailListMainContentProps) {
  const { items, isLoading } = useThumbnailListItemContext();
  logDev('main content rerenders');

  const memoizedItems = useMemo(() => {
    return items.map((item) => (
      <Grid
        key={item.id}
        item
        xs={muiBreakpoints.xs}
        sm={muiBreakpoints.sm}
        md={muiBreakpoints.md}
        lg={muiBreakpoints.lg}
        xl={muiBreakpoints.xl}
      >
        <RatioWrapper>
          <ThumbnailListItem
            id={item.id}
            thumbnailUrl={item.thumbnailUrl}
            title={item.title}
            subTitle={item.subTitle}
            infoLabel={item.label}
            onClick={item.onClick}
          ></ThumbnailListItem>
        </RatioWrapper>
      </Grid>
    ));
  }, [items, muiBreakpoints]);

  return (
    <>
      <Box sx={{ mt: 0.75, mb: 0.75 }}>
        <LinearProgress sx={{ opacity: isLoading ? 1 : 0 }} />
      </Box>
      <Grid container spacing={spacing}>
        {memoizedItems}
      </Grid>
    </>
  );
}

type ThumbnailListMainContentProps = {
  muiBreakpoints?: BreakpointType;
  spacing?: number;
};
