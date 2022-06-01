import React, { useMemo, CSSProperties } from 'react';
import { styled, keyframes } from 'goober';
import { renderContent } from '../core/utils';
import type { Toast, ToastPosition } from '../core/types';
import ToastIcon from './toast-icon';
import { prefersReducedMotion } from '../core/utils';

const enterAnimation = (factor: number) => `
0% {transform: translate3d(0,${factor * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`;

const exitAnimation = (factor: number) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${factor * -200}%,-1px) scale(.6); opacity:0;}
`;

const fadeInAnimation = `0%{opacity:0;} 100%{opacity:1;}`;
const fadeOutAnimation = `0%{opacity:1;} 100%{opacity:0;}`;

const ToastBarBase = styled('div')`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`;

const Content = styled('div')`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`;

export interface ToastBarProps {
  toast: Toast;
  position?: ToastPosition;
  style?: CSSProperties;
  children?: (components: { icon?: React.ReactNode; content: React.ReactNode }) => React.ReactNode;
}

const getAnimationStyle = (position: ToastPosition, visible: boolean): CSSProperties => {
  const top = position.includes('top');
  const factor = top ? 1 : -1;
  const [enter, exit] = prefersReducedMotion()
    ? [fadeInAnimation, fadeOutAnimation]
    : [enterAnimation(factor), exitAnimation(factor)];

  return {
    animation: visible
      ? `${keyframes(enter)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
      : `${keyframes(exit)} 0.4s cubic-bezier(.06,.71,.55,1) forwards`,
  };
};

const ToastBar: React.FC<ToastBarProps> = ({ toast, position, style, children }) => {
  const animationStyle: CSSProperties = toast?.height
    ? getAnimationStyle(toast.position || position || 'top-center', toast.visible)
    : { opacity: 0 };

  const icon = useMemo(() => <ToastIcon toast={toast} />, [toast]);
  const content = useMemo(
    () => <Content {...toast.ariaProps}>{renderContent(toast.content, toast)}</Content>,
    [toast],
  );

  return (
    <ToastBarBase
      className={toast.className}
      style={{
        ...animationStyle,
        ...style,
        ...toast.style,
      }}
    >
      {typeof children === 'function' ? (
        children({ icon, content })
      ) : (
        <>
          {icon}
          {content}
        </>
      )}
    </ToastBarBase>
  );
};

export default React.memo(ToastBar);
