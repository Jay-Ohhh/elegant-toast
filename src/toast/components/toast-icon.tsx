import React, { useMemo } from 'react';
import { styled, keyframes } from 'goober';

import type { ToastIconProps } from '../core/types';
import { ErrorIcon, ErrorTheme } from './error';
import { LoaderIcon, LoaderTheme } from './loader';
import { CheckmarkIcon, CheckmarkTheme } from './checkmark';
import { WarnIcon, WarnTheme } from './warn';

const IndicatorWrapper = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`;

const enter = keyframes`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}
`;

export const AnimatedIconWrapper = styled('div')`
  position: relative;
  min-width: 20px;
  transform: scale(0.6);
  opacity: 0.4;
  animation: ${enter} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.12s forwards;
`;

export type IconThemes = Partial<{
  success: CheckmarkTheme;
  warn: WarnTheme;
  error: ErrorTheme;
  loading: LoaderTheme;
}>;

const toastIcon: React.FC<ToastIconProps> = ({ icon, type = 'blank', iconTheme }) => {
  const node = useMemo(() => {
    let t: JSX.Element;
    if (icon) {
      if (typeof icon === 'string') {
        t = <AnimatedIconWrapper>{icon}</AnimatedIconWrapper>;
      } else {
        t = icon;
      }
      return t;
    }
    if (type === 'blank' || type === 'custom') return null;

    return (
      <IndicatorWrapper>
        {type === 'loading' ? (
          <LoaderIcon {...iconTheme} />
        ) : type === 'success' ? (
          <CheckmarkIcon {...iconTheme} />
        ) : type === 'warn' ? (
          <WarnIcon {...iconTheme} />
        ) : (
          <ErrorIcon {...iconTheme} />
        )}
      </IndicatorWrapper>
    );
  }, [icon, type, iconTheme]);

  return node;
};

export const ToastIcon = React.memo(toastIcon);
