import React, { useMemo } from 'react';
import { styled, keyframes } from 'goober';

import type { Toast } from '../core/types';
import ErrorIcon, { ErrorTheme } from './error';
import LoaderIcon, { LoaderTheme } from './loader';
import CheckmarkIcon, { CheckmarkTheme } from './checkmark';

const StatusWrapper = styled('div')`
  position: absolute;
`;

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
  error: ErrorTheme;
  loading: LoaderTheme;
}>;

const ToastIcon: React.FC<{
  toast: Toast;
}> = ({ toast }) => {
  const { icon, type, iconTheme } = toast;
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
    if (type === 'blank') return null;

    return (
      <IndicatorWrapper>
        <LoaderIcon {...iconTheme} />
        {type !== 'loading' && (
          <StatusWrapper>
            {type === 'success' ? <CheckmarkIcon {...iconTheme} /> : <ErrorIcon {...iconTheme} />}
          </StatusWrapper>
        )}
      </IndicatorWrapper>
    );
  }, [icon, type, iconTheme]);

  return node;
};

export default React.memo(ToastIcon);
