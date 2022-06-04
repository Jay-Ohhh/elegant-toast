import React, { useState } from 'react';
import { toast, useToaster } from 'elegant-toast';

// 自定义 toaster
const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;
  return (
    <div onMouseEnter={startPause} onMouseLeave={endPause}>
      {toasts
        .filter(toast => toast.visible)
        .map(toast => (
          <div key={toast.id} {...toast.ariaProps}>
            {typeof toast.content === 'function' ? toast.content(toast) : toast.content}
          </div>
        ))}
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
            // 使用自定义的容器而不使用内置的toaster作为挂载节点，为true时，除了toastLimit其它属性均无效
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
