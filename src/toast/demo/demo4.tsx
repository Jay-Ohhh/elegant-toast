import React, { useState } from 'react';
import { toast, useToaster } from 'elegant-toast';

// 自定义 toaster
const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;
  return (
    <div
      style={{
        position: 'fixed',
        top: 8,
        left: 8,
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map(toast => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          gutter: 8,
        });
        const ref = el => {
          if (el && !toast.height) {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };
        return (
          <div
            key={toast.id}
            ref={ref}
            style={{
              position: 'absolute',
              width: '200px',
              background: 'papayawhip',
              transition: 'all 0.5s ease-out',
              opacity: toast.visible ? 1 : 0,
              transform: `translateY(${offset}px)`,
            }}
            {...toast.ariaProps}
          >
            {typeof toast.content === 'function' ? toast.content(toast) : toast.content}
          </div>
        );
      })}
    </div>
  );
};

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          toast.config({
            customToaster: true,
          });
          setVisible(true);
        }}
      >
        custom toaster
      </button>
      <button
        style={{ margin: '0 10px' }}
        onClick={() => {
          // Create toasts anywhere
          toast('Hello World');
        }}
      >
        Hello World
      </button>
      <button
        onClick={() => {
          toast.config({});
          setVisible(false);
        }}
      >
        rest config
      </button>
      {/* 确保全局中只能存在一个 toaster */}
      {visible && <Notifications />}
    </>
  );
};
