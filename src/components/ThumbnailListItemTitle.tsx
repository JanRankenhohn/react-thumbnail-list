import { Box, Typography, styled } from '@mui/material';
import { ReactNode, Children } from 'react';
import EllipsisContainer from './EllipsisContainer';
import { Stack } from '@mui/system';

export default function ThumbnailListItemTitle(props: { title: ReactNode; children: ReactNode }) {
  const StyledCardContent = styled('div')((props) => ({
    [props.theme.breakpoints.up('xs')]: {
      padding: props.theme.spacing(1),
      flex: '1 0 auto',
      '&:last-child': { paddingBottom: 0 },
      overflow: 'hidden',
    },
  }));

  const children = Children.toArray(props.children);

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
              {children.map((child, index) => (
                <Typography key={index} variant="subtitle2" sx={{ fontSize: '0.84rem' }} color="text.secondary">
                  {child}
                </Typography>
              ))}
            </EllipsisContainer>
          </Stack>
        </StyledCardContent>
      </Box>
    </>
  );
}
