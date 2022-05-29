import React, { CSSProperties } from 'react';

export type ToastType = 'success' | 'error' | 'loading' | 'blank' | 'custom';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface IconTheme {
  primary: string; // icon 背景色
  secondary: string; // icon 字体色
}

export type ValueFunction<TValue, TArg = undefined> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg = undefined> = TValue | ValueFunction<TArg>;

export interface Toast {
  type: ToastType;
  id: string | number;
  content: ValueOrFunction<React.ReactNode, Toast>;
  icon?: React.ReactNode;
  duration?: number; // 单位ms
  pauseDuration: number; // 单位ms，暂停了多久时间
  position?: ToastPosition;

  ariaProps: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };

  style?: CSSProperties;
  className?: string;
  iconTheme?: IconTheme;

  createdAt: number;
  visible: boolean;
  height?: number;
}

export type ToastBaseOptions = Partial<
  Pick<
    Toast,
    'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'iconTheme'
  >
>;

export type ToastOptions = ToastBaseOptions & {
  [key in ToastType]?: ToastOptions;
};

export interface ToasterProps {
  defaultPosition?: ToastPosition; // defaultPosition
  toastOptions?: ToastOptions;
  reverseOrder?: boolean; // 掉转顺序
  gutter?: number; // toasts的间距
  wrapperStyle?: React.CSSProperties; // Toaster的最外层元素样式
  wrapperClassName?: string;
  children?: (toast: Toast) => React.ReactNode;
  getContainer?: () => HTMLElement;
}
