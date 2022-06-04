import React from 'react';
import ReactDOM from 'react-dom';
import type { Toast, ToastBaseOptions, ToastOptions, ToastType, GlobalConfig, ValueOrFunction } from './types';
import { renderContent, genId, isBrowser } from './utils';
import { dispatch, ActionType } from './store';
import { Toaster } from '../components/toaster';

type Content = Toast['content'];

type ToastHandler = (content: Content, options?: ToastBaseOptions) => string | number;

const createToast = (content: Content, type: ToastType = 'blank', options?: ToastBaseOptions): Toast => ({
  createdAt: new Date().getTime(),
  visible: true,
  type,
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
  content: content,
  pauseDuration: 0,
  ...options,
  id: options?.id || genId(),
});

const createHandler = (type?: ToastType): ToastHandler =>
  function (content, options) {
    const toast = createToast(content, type, options);
    dispatch({ type: ActionType.UPSERT_TOAST, toast });
    return toast.id;
  };

// Why not write: const toast:ToastHandler = createHandler()
// Since `success` is not in `ToastHandler`
const toast = (content: Content, options?: ToastBaseOptions) => createHandler()(content, options);

// 全局配置
let TOAST_LIMIT: number = 20; // toast数量限制
let container: HTMLElement | null = null;
let dom: HTMLElement | null = null;
toast.config = (config: GlobalConfig) => {
  const { getContainer = () => document.body, toastLimit, customToaster, ...rest } = config;

  TOAST_LIMIT = toastLimit || 20;

  if (customToaster) {
    if (dom) {
      ReactDOM.unmountComponentAtNode(dom);
      dom.remove();
      dom = null;
    }
    container = null;
    return;
  }

  const temp = getContainer();
  if (container !== temp || !container) {
    if (dom) {
      // 在 React 18 中，unmountComponentAtNode 已被 root.unmount() 取代。具体请参阅 createRoot 以了解更多，目前18.2 未被遗弃
      ReactDOM.unmountComponentAtNode(dom);
      dom.remove();
    } else {
      dom = document.createElement('div');
    }
    container = temp;
    container.appendChild(dom);
  }
  // 在 React 18 中，render 函数已被 createRoot 函数所取代。具体请参阅 createRoot 以了解更多，目前18.2 未被遗弃
  // 在 React 18 中，请使用 hydrateRoot 来替代 hydrate。请参阅 hydrateRoot 以了解更多。
  if (isBrowser()) {
    dom && ReactDOM.render(<Toaster {...rest} />, dom);
  } else {
    dom && ReactDOM.hydrate(<Toaster {...rest} />, dom);
  }
};

toast.config({});

// 函数toast添加静态方法
toast.success = createHandler('success');
toast.warn = createHandler('warn');
toast.error = createHandler('error');
toast.loading = createHandler('loading');
toast.custom = createHandler('custom');

toast.dismiss = (toastId?: string | number) => {
  dispatch({
    type: ActionType.DISMISS_TOAST,
    toastId,
  });
};

toast.remove = (toastId?: string | number) => {
  dispatch({ type: ActionType.REMOVE_TOAST, toastId });
};

toast.promise = toastPromise;

function toastPromise<T>(
  promise: Promise<T>,
  contents: {
    loading: React.ReactNode | (() => React.ReactNode); // pengding 显示的内容
    success: ValueOrFunction<T>; // fulfilled 显示的内容
    error: ValueOrFunction<any>; // rejected 显示的内容
  },
  options?: ToastOptions & { onClose?: (t: Toast) => void },
) {
  const loadingContent = renderContent(contents.loading);

  const id = toast.loading(loadingContent, { ...options, ...options?.loading });

  return promise
    .then(res => {
      toast.success(renderContent(contents.success, res), { id, ...options, ...options?.success });
      return res;
    })
    .catch(err => {
      toast.error(renderContent(contents.error, err), { id, ...options, ...options?.error });
    });
}

export { TOAST_LIMIT };
export { toast };
