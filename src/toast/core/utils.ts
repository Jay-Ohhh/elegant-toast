export const perferReduceMotion = (() => {
  let shouldReduceMotion: boolean | undefined;
  return () => {
    if (shouldReduceMotion === undefined && typeof matchMedia !== 'undefined') {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia#syntax
      // e.g. let mql = window.matchMedia('(max-width: 600px)');
      // mql 可被用于判定Document是否匹配媒体查询或者监控一个 document 来判定它匹配了或者停止匹配了此媒体查询。

      // https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-reduced-motion
      // CSS 媒体查询特性 prefers-reduced-motion 用于检测用户的系统是否被开启了动画减弱功能
      const mediaQuery = matchMedia('(prefers-reduced-motion: reduce)');
      shouldReduceMotion = !mediaQuery || mediaQuery.matches;
    }
    return shouldReduceMotion;
  };
})();

export function isFunction(obj: any): obj is Function {
  return typeof obj === 'function';
}

export function renderContent<TValue, TArg>(content: TValue, toast?: TArg) {
  return isFunction(content) ? content(toast) : content;
}

export const genId = (() => {
  let count = 0;
  return () => (count++).toString();
})();
