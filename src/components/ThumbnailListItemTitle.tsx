import { Box, Typography, styled } from '@mui/material';
import { ReactNode } from 'react';
import EllipsisContainer from './EllipsisContainer';
import { Stack } from '@mui/system';

export default function ThumbnailListItemTitle(props: { title: string; subTitle: ReactNode }) {
  const StyledCardContent = styled('div')((p) => ({
    [p.theme.breakpoints.up('xs')]: {
      padding: p.theme.spacing(1),
      flex: '1 0 auto',
      '&:last-child': { paddingBottom: 0 },
      overflow: 'hidden',
    },
  }));

  console.log('item title rerenders');

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
