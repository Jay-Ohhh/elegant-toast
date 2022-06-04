import React from 'react';
import { styled, keyframes } from 'goober';

const circleAnimation = keyframes`
from {
  transform: scale(0);
	opacity: 0;
}
to {
  transform: scale(1);
	opacity: 1;
}`;

export interface WarnTheme {
  primary?: string;
  secondary?: string;
}

const warnIcon = styled('div')<WarnTheme>`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${p => p.primary || '#faad14'};
  opacity: 0;
  animation: ${circleAnimation} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;

  &:after {
    position: absolute;
    top: 10px;
    left: 10px;
    box-sizing: border-box;
    color: ${p => p.primary || '#fff'};
    font-size: 13px;
    transform: translate(-50%, -50%);
    content: '!';
  }
`;

export const WarnIcon = React.memo(warnIcon);
