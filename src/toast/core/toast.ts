import type {
  Toast,
  ToastBaseOptions,
  ToastOptions,
  ToastPosition,
  ToastType,
  ValueOrFunction,
} from './types';
import { renderContent, genId, isFunction } from './utils';
import { dispatch, ActionType } from './store';
import React from 'react';

type Content = Toast['content'];

type ToastHandler = (content: Content, options?: ToastBaseOptions) => string | number;

const createToast = (
  content: Content,
  type: ToastType = 'blank',
  options?: ToastBaseOptions,
): Toast => ({
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

// 函数toast添加静态方法
toast.success = createHandler('success');
toast.error = createHandler('success');
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

toast.promise = <T>(
  promise: Promise<T>,
  contents: {
    loading: React.ReactNode | (() => React.ReactNode); // pengding 显示的内容
    success: ValueOrFunction<React.ReactNode, T>; // fulfilled 显示的内容
    error: ValueOrFunction<React.ReactNode, any>; // rejected 显示的内容
  },
  options: ToastOptions,
) => {
  const loadingContent = renderContent(contents.loading);

  const id = toast.loading(loadingContent, { ...options, ...options?.loading });

  return promise
    .then((res) => {
      toast.success(renderContent(contents.success, res), { id, ...options, ...options?.success });
      return res;
    })
    .catch((err) => {
      toast.error(renderContent(contents.error, err), { id, ...options, ...options?.error });
    });
};

export { toast };
