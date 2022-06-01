import React from 'react';
import { styled, keyframes } from 'goober';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export interface LoaderTheme {
  primary?: string;
  secondary?: string;
}

const LoaderIcon = styled('div')<LoaderTheme>`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(p) => p.secondary || '#e0e0e0'};
  border-top-color: ${(p) => p.primary || '#616161'};
  animation: ${rotate} 1 s linear infinite;
`;
export default React.memo(LoaderIcon);
