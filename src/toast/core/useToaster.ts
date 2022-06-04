import { useEffect, useMemo } from 'react';
import { dispatch, ActionType, useStore } from './store';
import { toast } from './toast';
import type { ToastOptions, Toast, ToastPosition } from './types';

export const useToaster = (toastOptions?: ToastOptions) => {
  const { toasts, pausedAt } = useStore(toastOptions);

  const handlers = useMemo(
    () => ({
      startPause: () => {
        dispatch({
          type: ActionType.START_PAUSE,
          time: new Date().getTime(),
        });
      },
      endPause: () => {
        if (pausedAt) {
          dispatch({
            type: ActionType.END_PAUSE,
            time: new Date().getTime(),
          });
        }
      },
      updateHeight: (toastId: string | number, height: number) => {
        dispatch({
          type: ActionType.UPDATE_TOAST,
          toast: { id: toastId, height },
        });
      },
      // 计算距离顶部的高度
      calculateOffset: (
        toast: Toast,
        opts?: {
          reverseOrder?: boolean;
          gutter?: number; // toast间隔
          defaultPosition?: ToastPosition;
        },
      ) => {
        const { reverseOrder = false, gutter = 8, defaultPosition } = opts || {};

        // 同方向的toast
        const relevantToasts = toasts.filter(
          // 不要用 t.visible 作判断，而是用 t.height （代表元素存在）
          t => (t.position || defaultPosition) === (toast.position || defaultPosition) && t.height,
        );

        if (relevantToasts.length === 0) return 0;

        const toastIndex = relevantToasts.findIndex(t => t.id === toast.id);

        const toastIndexBeforeCount = toastIndex <= 0 ? 0 : toastIndex;

        // Assume toastIndex is 2
        // [0, 1, ] 2 [, 3, 4]
        const offset = relevantToasts
          .slice(...(reverseOrder ? [toastIndexBeforeCount + 1] : [0, toastIndexBeforeCount]))
          .reduce((acc, t) => acc + (t.height || 0) + gutter, 0);

        return offset;
      },
    }),
    [toasts, pausedAt],
  );

  useEffect(() => {
    if (pausedAt) {
      return;
    }

    const now = new Date().getTime();
    const timeouts = toasts.map(t => {
      if (t.duration === Infinity) {
        return;
      }

      const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);

      if (durationLeft < 0) {
        t.visible && toast.dismiss(t.id);
        return;
      }

      return setTimeout(() => t.visible && toast.dismiss(t.id), durationLeft);
    });

    return () => {
      timeouts.forEach(timeout => timeout && clearTimeout(timeout));
    };
  }, [toasts, pausedAt]);

  return {
    toasts,
    handlers,
  };
};
