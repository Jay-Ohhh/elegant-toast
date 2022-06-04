import React, { CSSProperties } from 'react';

export type ToastType = 'success' | 'warn' | 'error' | 'loading' | 'blank' | 'custom';

export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface IconTheme {
  primary: string; // 主颜色
  secondary: string; // 副颜色
}

export type ValueOrFunction<T = Toast> = React.ReactNode | ((val: T) => React.ReactNode);

export interface Toast {
  type: ToastType;
  /**
   * 当前toast的唯一标志
   */
  id: string | number;
  /**
   * 提示内容
   */
  content: ValueOrFunction;
  /**
   * 自定义图标
   */
  icon?: JSX.Element | string;
  /**
   * 自动关闭的延时，单位ms，设置为 Infinity 时不自动关闭
   */
  duration?: number;
  /**
   * 暂停了多久时间（鼠标在某一个 toast 上会暂停所有的toasts动作），单位ms
   */
  pauseDuration: number;
  /**
   * 弹出位置
   */
  position?: ToastPosition;
  /**
   * 提示内容的无障碍属性
   */
  ariaProps: {
    role: 'status' | 'alert';
    'aria-live': 'assertive' | 'off' | 'polite';
  };
  /**
   * toast的默认容器（ToastBar）的style
   */
  style?: CSSProperties;
  /**
   * toast的默认容器（ToastBar）的类名
   */
  className?: string;
  /**
   * primary: 内置 icon 主颜色；
   * secondary: 内置 icon 副颜色
   */
  iconTheme?: {
    primary: string;
    secondary: string;
  };
  /**
   * toast 被创建的时间戳
   */
  createdAt: number;
  /**
   * 并非代表toast是否显示，为false时，toast触发离开动画，1秒后才移除
   */
  visible: boolean;
  /**
   * toast的高度
   */
  height?: number;
  /**
   * 关闭时的回调函数
   */
  onClose?: (t?: Toast) => void;
}

export type ToastBaseOptions = Partial<
  Pick<Toast, 'id' | 'icon' | 'duration' | 'ariaProps' | 'className' | 'style' | 'position' | 'iconTheme' | 'onClose'>
>;

export type ToastOptions = ToastBaseOptions & {
  [key in ToastType]?: ToastOptions;
};

export interface ToasterProps {
  /** 默认弹出位置 */
  defaultPosition?: ToastPosition; // 默认top-center
  /** toast及其不同类型的配置 */
  toastOptions?: ToastOptions;
  /** 倒序 */
  reverseOrder?: boolean; // 默认false
  /** toasts的间距 */
  gutter?: number;
  /** Toaster的最外层元素样式 */
  toasterStyle?: React.CSSProperties;
  /** Toaster的最外层元素类名 */
  toasterClassName?: string;
  /** ToastBar的样式 */
  toastBarStyle?: React.CSSProperties;
  /** 弹出效果的CSS transition函数属性（transition-timing-function） */
  transitionTimingFunction?: string; // 默认 cubic-bezier(.21,1.02,.73,1)
  /** 自定义渲染toast的函数，默认使用ToastBar渲染toast */
  children?: (toast: Toast) => React.ReactNode;
}

export interface ToastBarProps {
  toast: Toast;
  position?: ToastPosition;
  style?: CSSProperties;
  content: ValueOrFunction;
  children?: (components: { icon?: JSX.Element; content: React.ReactNode }) => React.ReactNode;
}

export type ToastIconProps = Pick<Toast, 'icon' | 'type' | 'iconTheme'>;

export type GlobalConfig = ToasterProps & {
  /** 最大显示数, 超过限制时，最早的消息会被自动关闭 */
  toastLimit?: number; // 默认20
  /** Toaster的挂载位置 */
  getContainer?: () => HTMLElement; // 默认()=>document.body
  /** 使用自定义的容器而不使用内置的toaster作为挂载节点，为true时，除了toastLimit其它属性均无效 */
  customToaster?: boolean;
};
