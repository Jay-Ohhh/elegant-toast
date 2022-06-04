import React, { CSSProperties } from 'react';
import { toast } from 'elegant-toast';

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
export default () => {
  return (
    <div>
      <div id="elegenat-toast-uuid"></div>
      <button
        style={commonStyle}
        onClick={() => {
          toast.success('This is a success message');
        }}
      >
        success
      </button>
      <button
        style={commonStyle}
        onClick={() => {
          toast.warn(<span>This is a warning message</span>);
        }}
      >
        warn
      </button>
      <button
        style={commonStyle}
        onClick={() => {
          toast.error('This is a error message');
        }}
      >
        error
      </button>
      <button
        style={commonStyle}
        onClick={() => {
          const id = toast.loading('This is a loading message');
          setTimeout(() => {
            toast.dismiss(id);
          }, 2000);
        }}
      >
        loading
      </button>
      <button
        style={commonStyle}
        onClick={() => {
          const p = new Promise((resolve, reject) => {
            setTimeout(resolve, 2000);
            // setTimeout(reject, 2000)
          });
          toast.promise(p, {
            loading: 'Saving...',
            success: <b>Settings saved!</b>,
            error: <b>Could not save.</b>,
          });
        }}
      >
        promise
      </button>
      <button
        style={commonStyle}
        onClick={() => {
          toast.custom(
            t => {
              // 可以跟据 t.visible 添加进入、离开的动画效果
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 20,
                    padding: '6px 10px',
                    borderRadius: 5,
                    color: '#fff',
                    background: 'skyblue',
                  }}
                >
                  <div style={{ paddingRight: 10, marginRight: 10, borderRight: '1px solid #fff' }}>
                    Hello, this is a messgae!
                  </div>
                  <div
                    style={{ color: '#f16666', cursor: 'pointer' }}
                    onClick={() => {
                      toast.remove(t.id);
                    }}
                  >
                    close
                  </div>
                </div>
              );
            },
            {
              duration: 5000,
              onClose: t => {
                console.log(t);
              },
            },
          );
        }}
      >
        custom
      </button>
      <button
        style={commonStyle}
        onClick={() => {
          reverseOrder = !reverseOrder;
          toast.config({
            reverseOrder,
            getContainer:
              reverseOrder === true ? () => document.querySelector('#elegenat-toast-uuid')! : () => document.body,
          });
        }}
      >
        Toggle direction and Container
      </button>
      <button
        style={commonStyle}
        onClick={() => {
          toast.dismiss();
        }}
      >
        dismiss all
      </button>
      <button
        style={commonStyle}
        onClick={() => {
          toast.remove();
        }}
      >
        remove all
      </button>
      <div style={{ marginTop: 10 }}>
        {positions.map(position => (
          <button
            key={position}
            style={commonStyle}
            onClick={() => {
              toast.success(position, { position });
            }}
          >
            {position}
          </button>
        ))}
      </div>
    </div>
  );
};
