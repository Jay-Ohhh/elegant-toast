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

const loaderIcon = React.memo(styled('div')<LoaderTheme>`
  width: 15px;
  height: 15px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${p => p.secondary || '#e0e0e0'};
  border-top-color: ${p => p.primary || '#616161'};
  animation: ${rotate} 1s linear infinite;
`);

export const LoaderIcon = React.memo(loaderIcon);
