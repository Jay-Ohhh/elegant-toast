import React from 'react';
import { styled, keyframes } from 'goober';

const circleAniamtion = keyframes`
  from{
    transform: scale(0) rotate(45deg);
    opacity: 0;
  }
  to{
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }
`;

const firstLineAniation = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const secondLineAnimation = keyframes`
  from {
    transform: scale(0) rotate(90deg);
    opacity: 0;
  }
  to {
    transform: scale(1) rotate(90deg);
    opacity: 1;
  }
`;

export interface ErrorTheme {
  primary?: string;
  secondary?: string;
}

const errorIcon = styled('div')<ErrorTheme>`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${p => p.primary || '#ff4b4b'};
  transform: rotate(45deg);
  opacity: 0;
  /* forwards当动画完成后，保持最后一帧的状态（也就是最后一个关键帧中定义的状态） */
  animation: ${circleAniamtion} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 100ms forwards;

  &::before,
  &::after {
    position: absolute;
    bottom: 9px;
    left: 4px;
    width: 12px;
    height: 2px;
    background: ${p => p.secondary || '#fff'};
    border-radius: 3px;
    opacity: 0;
    animation: ${firstLineAniation} 0.15s ease-out 0.15s forwards;
    content: '';
  }
  &::after {
    transform: rotate(90deg);
    animation: ${secondLineAnimation} 0.15s ease-out 0.15s forwards;
  }
`;

export const ErrorIcon = React.memo(errorIcon);
