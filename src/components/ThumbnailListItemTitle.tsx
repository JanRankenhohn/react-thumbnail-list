import { Box, Typography, styled } from '@mui/material';
import { ReactNode } from 'react';
import EllipsisContainer from './EllipsisContainer';
import { Stack } from '@mui/system';
import { logDev } from '../utils/logHelper';

/**
 * Component that displays the title and subtitle of a thumbnail list item.
 * Text is automatically truncated with ellipsis when it exceeds the available space.
 * The number of visible lines adjusts based on screen size.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Primary title text displayed in bold
 * @param {ReactNode} props.subTitle - Secondary text displayed below the title
 * @returns {JSX.Element} The rendered title section with ellipsis overflow handling
 */
export default function ThumbnailListItemTitle(props: { title: string; subTitle: ReactNode }) {
  const StyledCardContent = styled('div')((p) => ({
    [p.theme.breakpoints.up('xs')]: {
      padding: p.theme.spacing(1),
      flex: '1 0 auto',
      '&:last-child': { paddingBottom: 0 },
      overflow: 'hidden',
    },
  }));

  logDev('item title rerenders');

  return (
    <>
      <Box>
        <StyledCardContent>
          <EllipsisContainer lineClamp={{ xs: 1, sm: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {props.title}
            </Typography>
          </EllipsisContainer>
          <Stack direction="row" gap={1}>
            <EllipsisContainer lineClamp={{ xs: 1, sm: 2 }}>
              <Typography variant="subtitle2" sx={{ fontSize: '0.84rem' }} color="text.secondary">
                {props.subTitle}
              </Typography>
            </EllipsisContainer>
          </Stack>
        </StyledCardContent>
      </Box>
    </>
  );
}
