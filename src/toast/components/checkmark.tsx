import React from 'react';
import { styled, keyframes } from 'goober';

const circleAnimation = keyframes`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`;

const checkmarkAnimation = keyframes`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`;

export interface CheckmarkTheme {
  primary?: string;
  secondary?: string;
}

const checkmarkIcon = styled('div')<CheckmarkTheme>`
  width: 20px;
  height: 20px;
  opacity: 0;
  border-radius: 10px;
  position: relative;
  transform: rotate(45deg);
  background: ${p => p.primary || '#61d345'};

  animation: ${circleAnimation} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 100ms forwards;
  &:after {
    position: absolute;
    bottom: 6px;
    left: 6px;
    box-sizing: border-box;
    width: 6px;
    height: 10px;
    border-right: 2px solid ${p => p.secondary || '#fff'};
    border-bottom: 2px solid ${p => p.secondary || '#fff'};
    opacity: 0;
    animation: ${checkmarkAnimation} 0.2s ease-out 200ms forwards;
    content: '';
  }
`;

export const CheckmarkIcon = React.memo(checkmarkIcon);
