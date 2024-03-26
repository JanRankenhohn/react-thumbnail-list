import {styled} from '@mui/material';
import {ReactNode} from 'react';

/**
 * Creates a ellipies text with webkit css styles
 * @param props lineClamp: lines till ellipses
 * @returns component
 */
export default function EllipsisContainer(props: EllipsisContainerProps) {
  const EllipsisContainer = styled('div')((p) => ({
    [p.theme.breakpoints.up('xs')]: {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: props.lineClamp.xs.toString(), /* number of lines to show */
      WebkitBoxOrient: 'vertical',
    },
    [p.theme.breakpoints.up('sm')]: {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: props.lineClamp.sm.toString(), /* number of lines to show */
      WebkitBoxOrient: 'vertical', /* number of lines to show */
    },
  }));

  return (
    <EllipsisContainer>
      {props.children}
    </EllipsisContainer>
  );
}

type EllipsisContainerProps = {
    lineClamp: {xs: number, sm: number},
    children: ReactNode,
}
