import { useEffect, useState } from 'react';
import { Toast, ToastBaseOptions, ToastOptions, ToastType } from './types';

// toast数量限制
const TOAST_LIMIT = 20;

// DISMISS_TOAST 和 REMOVE_TOAST的区别：
// DISMISS_TOAST：触发消失动画且默认1秒后才被移除
// REMOVE_TOAST：立即移除
export enum ActionType {
  ADD_TOAST,
  UPDATE_TOAST,
  UPSERT_TOAST, // 更新或插入到头部
  DISMISS_TOAST,
  REMOVE_TOAST,
  START_PAUSE,
  END_PAUSE,
}

type Action =
  | {
      type: ActionType.ADD_TOAST;
      toast: Toast;
    }
  | {
      type: ActionType.UPSERT_TOAST;
      toast: Toast;
    }
  | {
      type: ActionType.UPDATE_TOAST;
      toast: Partial<Toast>;
    }
  | {
      type: ActionType.DISMISS_TOAST;
      toastId?: string | number;
    }
  | {
      type: ActionType.REMOVE_TOAST;
      toastId?: string | number;
    }
  | {
      type: ActionType.START_PAUSE;
      time: number;
    }
  | {
      type: ActionType.END_PAUSE;
      time: number;
    };

interface State {
  toasts: Toast[];
  pasueAt: number;
}

// 待移除的toasts队列
const toastTimeouts = new Map<Toast['id'], NodeJS.Timeout>();

// 加入到待移除的toasts队列，用于DISMISS_TOAST
function addToRemoveQueue(toastId: string | number) {
  // 已存在的toast则不用加入toastTimeouts
  if (toastTimeouts.has(toastId)) return;
  // 一秒后移除
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: ActionType.REMOVE_TOAST, toastId });
  }, 1000);
  toastTimeouts.set(toastId, timeout);
}

function clearFromRemoveQueue(toastId: string | number) {
  const timeout = toastTimeouts.get(toastId);
  timeout && clearTimeout(timeout);
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ADD_TOAST: {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    }

    case ActionType.REMOVE_TOAST: {
      const { toastId } = action;
      if (!toastId) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => {
          t.onClose?.(t);
          return t.id !== toastId;
        }),
      };
    }

    case ActionType.UPDATE_TOAST: {
      const id = action.toast.id;
      if (!id) return state;

      clearFromRemoveQueue(id);
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === id
            ? {
                ...t,
                ...action.toast,
              }
            : t,
        ),
      };
    }

    case ActionType.UPSERT_TOAST: {
      const { toast } = action;
      return state.toasts.some((t) => t.id === toast.id)
        ? reducer(state, { type: ActionType.UPDATE_TOAST, toast: toast })
        : reducer(state, { type: ActionType.ADD_TOAST, toast: toast });
    }

    case ActionType.DISMISS_TOAST: {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        // 若没有传入toastId，则dismiss全部toasts
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                visible: false,
              }
            : t,
        ),
      };
    }

    case ActionType.START_PAUSE: {
      return {
        ...state,
        pasueAt: action.time,
      };
    }

    case ActionType.END_PAUSE: {
      const diff = action.time - state.pasueAt;
      return {
        ...state,
        pasueAt: 0,
        toasts: state.toasts.map((t) => ({
          ...t,
          pauseDuration: t.pauseDuration + diff, // 暂停了多久时间
        })),
      };
    }

    default:
      return state;
  }
};
// 收集者
const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [], pasueAt: 0 };

// dispatch后，让listeners通知各个setState进行更新
export const dispatch = (action: Action) => {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
};

const defaultTimeouts: {
  [key in ToastType]: number;
} = {
  blank: 4000,
  error: 4000,
  success: 2000,
  loading: Infinity,
  custom: 4000,
};

export const useStore = (toastOptions: ToastOptions = {}): State => {
  const [state, setState] = useState(memoryState);
  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const mergedToasts = state.toasts.map((t) => ({
    ...toastOptions,
    ...toastOptions[t.type],
    ...t, // t 因为有些属性是最新的状态，例如visible，pauseDuration等，因此放在最后
    // t.duration，style 是调用toast()时传入的options，但不是必传且没有默认值，属于单个toast特有的otpion，优先级最高
    // toastOptions是默认 toaster 的toastOptions，作为各个toast共享的options
    duration:
      t.duration ||
      toastOptions[t.type]?.duration ||
      toastOptions?.duration ||
      defaultTimeouts[t.type],
    style: {
      ...toastOptions.style,
      ...toastOptions[t.type]?.style,
      ...t.style,
    },
  }));

  return {
    ...state,
    toasts: mergedToasts,
  };
};
