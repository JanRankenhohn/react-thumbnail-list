import {Box, Stack} from '@mui/material';
import {ReactNode} from 'react';

export default function ThumbnailListItemInfoLabel(props: {topContent?: ReactNode, bottomContent?: ReactNode}) {
  return <>
    <Stack textAlign="right" justifyContent="space-between">
      <Box textAlign="right" padding={1}>
        {props.topContent}
      </Box>
      <Box textAlign="right" padding={1}>
        {props.bottomContent}
      </Box>
    </Stack>
  </>;
}
