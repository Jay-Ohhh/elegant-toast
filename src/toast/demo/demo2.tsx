import React, { CSSProperties } from 'react';
import { toast, ToastBar, ToastIcon } from 'elegant-toast';

const commonStyle: CSSProperties = {
  margin: '0px 10px 10px 0',
  fontSize: 14,
};
type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

const positions: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

let reverseOrder = false;
const enterStyle: CSSProperties = {};
const exitStyle: CSSProperties = {};
export default () => {
  return (
    <div>
      <button
        style={commonStyle}
        onClick={() => {
          // 注意：toast.content 不能赋值给 content，因为custom内渲染函数即为所创建的toast的content，显然不是我们ToastBar内要显示的content
          toast.custom(
            toast => (
              <ToastBar
                toast={toast}
                content={toast => toast.id}
                style={toast.visible ? enterStyle : exitStyle}
                position="top-center"
              />
            ),
            {
              icon: <span>🧀</span>,
            },
          );
        }}
      >
        custom 1
      </button>
      <button
        style={commonStyle}
        onClick={() => {
          // 注意：toast.content 不能赋值给 content，因为custom内渲染函数即为所创建的toast的content，显然不是我们ToastBar内要显示的content
          toast.custom(
            toast => (
              <ToastBar
                toast={toast}
                style={toast.visible ? enterStyle : exitStyle}
                content={toast => <div style={{ margin: '0 5px' }}>{toast.id}</div>}
                position="top-center"
              >
                {({ icon, content }) => (
                  <>
                    {icon}
                    {content}
                  </>
                )}
              </ToastBar>
            ),
            {
              icon: <span>🧀</span>,
            },
          );
        }}
      >
        custom 2
      </button>
    </div>
  );
};
