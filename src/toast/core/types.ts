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
  primary: string; // 主颜色
  secondary: string; // 副颜色
}

export type ValueOrFunction<T = Toast> = React.ReactNode | ((val: T) => React.ReactNode);

export interface Toast {
  type: ToastType;
  id: string | number;
  content: ValueOrFunction;
  icon?: JSX.Element;
  duration?: number; // 单位ms
  pauseDuration: number; // 单位ms，暂停了多久时间
  position?: ToastPosition;

  ariaProps: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };

  style?: CSSProperties;
  className?: string; // toast的默认容器（ToastBar）的类名
  iconTheme?: {
    primary: string; // 内置 icon 主颜色
    secondary: string; // 内置 icon 副颜色
  };

  createdAt: number;
  visible: boolean;
  height?: number;
  onClose?: (t?: Toast) => void; // 关闭时的回调函数
}
interface Options {
  id?: string | number; // 当前提示的唯一标志
  icon?: JSX.Element; // 自定义图标
  duration?: number; // 自动关闭的延时，单位ms，设置为 Infinity 时不自动关闭
  // 提示内容的无障碍属性，默认值 { role: 'status','aria-live': 'polite' }
  ariaProps?: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };
  className?: string; // toast的默认容器（ToastBar）的类名
  style?: CSSProperties; // toast的默认容器（ToastBar）的style
  iconTheme?: IconTheme;
  // 方向，默认值：top-center
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  onClose?: (t?: Toast) => void; // 关闭时的回调函数
}
export type ToastBaseOptions = Partial<
  Pick<
    Toast,
    | 'id'
    | 'icon'
    | 'duration'
    | 'ariaProps'
    | 'className'
    | 'style'
    | 'position'
    | 'iconTheme'
    | 'onClose'
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
  transitionTimingFunction?: string;
  children?: (toast: Toast) => React.ReactNode;
  getContainer?: () => HTMLElement;
}
