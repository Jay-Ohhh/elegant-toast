/**
 * 思路
 * 1. 维护一个store，保存toasts，通过reducer进行增删改
 * 2. 建立一个收集者，reducer触发时会让收集者通知订阅者进行更新状态
 */
import React, { memo, useMemo, useCallback, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { css, setup } from 'goober';
import type { ToastPosition, ToasterProps } from '../core/types';
import { prefersReducedMotion, renderContent } from '../core/utils';
import { useToaster } from '../core/useToaster';
import ToastBar from './toast-bar';

setup(React.createElement);

// offset: 第几个
const getPositionStyle = (
  position: ToastPosition,
  offset: number,
  transitionTimingFunction = 'cubic-bezier(.21,1.02,.73,1)',
): CSSProperties => {
  const top = position.includes('top');
  const verticalStyle: CSSProperties = top ? { top: 0 } : { bottom: 0 };
  const horizonalStyle: CSSProperties = position.includes('center')
    ? {
        justifyContent: 'center',
      }
    : position.includes('right')
    ? {
        justifyContent: 'flex-end',
      }
    : {};
  return {
    position: 'absolute',
    left: 0,
    right: 0,
    display: 'flex',
    // 是否启用过渡效果
    transition: prefersReducedMotion() ? undefined : `all 230ms ${transitionTimingFunction}`,
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizonalStyle,
  };
};

const activeClass = css`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;

const DEFAULT_OFFSET = 16;

const Toaster: React.FC<ToasterProps> = ({
  reverseOrder,
  defaultPosition = 'top-center',
  toastOptions,
  gutter,
  children,
  wrapperStyle,
  wrapperClassName,
  transitionTimingFunction,
  getContainer = () => document.body,
}) => {
  const { toasts, handlers } = useToaster(toastOptions);

  const getRectRef = useCallback(
    (callback: (rect: DOMRect) => void) => (el: HTMLElement | null) => {
      if (el) {
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          callback(rect);
        });
      }
    },
    [],
  );

  const parentDom = useMemo(() => getContainer(), [getContainer]);

  const toaster = (
    <div
      className={wrapperClassName}
      style={{
        position: 'fixed',
        zIndex: 9999,
        top: DEFAULT_OFFSET,
        left: DEFAULT_OFFSET,
        right: DEFAULT_OFFSET,
        bottom: DEFAULT_OFFSET,
        // https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events
        // none：元素永远不会成为鼠标事件的target。但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。
        pointerEvents: 'none', // 会影响子元素，因此子元素需要设置 'auto'
        ...wrapperStyle,
      }}
      onMouseEnter={handlers.startPause}
      onMouseLeave={handlers.endPause}
    >
      {toasts.map((t) => {
        const toastPosition = t.position || defaultPosition;
        const offset = handlers.calculateOffset(t, {
          reverseOrder,
          gutter,
          defaultPosition,
        });
        const positionStyle = getPositionStyle(toastPosition, offset, transitionTimingFunction);

        const ref = t.height
          ? undefined
          : getRectRef((el) => {
              handlers.updateHeight(t.id, el.height);
            });
        return (
          <div ref={ref} key={t.id} className={t.visible ? activeClass : ''} style={positionStyle}>
            {t.type === 'custom' ? (
              renderContent(t.content, t)
            ) : children ? (
              children(t)
            ) : (
              <ToastBar toast={t} position={toastPosition}></ToastBar>
            )}
          </div>
        );
      })}
    </div>
  );

  return ReactDOM.createPortal(toaster, parentDom);
};

export default memo(Toaster);
