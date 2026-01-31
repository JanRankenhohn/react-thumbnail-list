import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';

/**
 * Info label component that displays additional content in the right section of a thumbnail item.
 * Content is arranged vertically with top and bottom sections.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} [props.topContent] - Optional content displayed at the top of the label area
 * @param {ReactNode} [props.bottomContent] - Optional content displayed at the bottom of the label area
 * @returns {JSX.Element} The rendered info label with right-aligned content
 */
export default function ThumbnailListItemInfoLabel(props: { topContent?: ReactNode; bottomContent?: ReactNode }) {
  return (
    <>
      <Stack textAlign="right" justifyContent="space-between">
        <Box textAlign="right" padding={1}>
          {props.topContent}
        </Box>
        <Box textAlign="right" padding={1}>
          {props.bottomContent}
        </Box>
      </Stack>
    </>
  );
}
