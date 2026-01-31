import { styled } from '@mui/material';
import { ReactNode } from 'react';

const StyledEllipsisContainer = styled('div')<{ lineClamp: { xs: number; sm: number } }>(({ theme, lineClamp }) => ({
  [theme.breakpoints.up('xs')]: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: lineClamp.xs.toString(),
    WebkitBoxOrient: 'vertical',
  },
  [theme.breakpoints.up('sm')]: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: lineClamp.sm.toString(),
    WebkitBoxOrient: 'vertical',
  },
}));

/**
 * Creates a ellipies text with webkit css styles
 * @param props lineClamp: lines till ellipses
 * @returns component
 */
export default function EllipsisContainer(props: EllipsisContainerProps) {
  return <StyledEllipsisContainer lineClamp={props.lineClamp}>{props.children}</StyledEllipsisContainer>;
}

type EllipsisContainerProps = {
  lineClamp: { xs: number; sm: number };
  children: ReactNode;
};
