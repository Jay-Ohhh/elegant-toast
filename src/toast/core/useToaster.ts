import { useEffect, useMemo } from 'react';
import { dispatch, ActionType, useStore } from './store';
import { toast } from './toast';
import type { ToastOptions, Toast, ToastPosition } from './types';

export const useToaster = (toastOptions?: ToastOptions) => {
  const { toasts, pasueAt } = useStore(toastOptions);

  const handlers = useMemo(
    () => ({
      startPause: () => {
        dispatch({
          type: ActionType.START_PAUSE,
          time: new Date().getDate(),
        });
      },
      endPause: () => {
        if (pasueAt) {
          dispatch({
            type: ActionType.END_PAUSE,
            time: new Date().getDate(),
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
          (t) =>
            (t.position || defaultPosition) === (toast.position || defaultPosition) &&
            t.height &&
            t.visible,
        );

        if (relevantToasts.length === 0) return 0;

        const toastIndex = relevantToasts.findIndex((t) => t.id === toast.id);

        const toastIndexBeforeCount = toastIndex <= 0 ? 0 : toastIndex;

        // Assume toastIndex is 2
        // [0, 1, ] 2 [, 3, 4]
        const offset = relevantToasts
          .slice(...(reverseOrder ? [toastIndexBeforeCount + 1] : [0, toastIndexBeforeCount]))
          .reduce((acc, t) => acc + (t.height || 0) + gutter, 0);

        return offset;
      },
    }),
    [toasts, pasueAt],
  );

  useEffect(() => {
    if (pasueAt) {
      return;
    }

    const now = new Date().getTime();
    const timeouts = toasts.map((t) => {
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
      timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
    };
  }, [toasts, pasueAt]);

  return {
    toasts,
    handlers,
  };
};
