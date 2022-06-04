---
nav:
  path: /components
---

# Toast

一个简洁易用、支持多方向和自定义内容、样式、icon、promise 、手动关闭的 React **Tosat** 组件，类似于 antd 的 message 和 notification 。

|     Features     | Support |
| :--------------: | :-----: |
|   Icon、emoji    |    ✔️    |
|    Positions     |    ✔️    |
|   Customizable   |    ✔️    |
|     Promise      |    ✔️    |
|  Pause on hover  |    ✔️    |
| Toggle direction |    ✔️    |
|   Manual close   |    ✔️    |
|       SSR        |    ✔️    |

## Getting Started

```bash
npm install elegant-toast
```

**or**

```bash
yarn add elegant-toast
```

**Uasge**

Toasts 从 Toaster 中弹出

- Toaster：烤面包机，是 toasts 挂载的节点，默认不可见，默认挂载到 **document.body** ，可以通过 `toast.config` 配置`toasterStyle`

- Toast：吐司

```tsx | pure
import toast from 'elegant-toast';
const message = () => toast('Hello World!');

const App = () => {
  return (
    <div>
      <button onClick={message}>Make me a toast</button>
    </div>
  );
};
```

## API

### toast

组件提供了一些静态方法用于触发 `toast` 弹出，使用方式和参数如下：

```js
toast(content, options) // 类型是blank
toast.success(content, options)
toast.warn(content, options)
toast.error(content, options)
toast.loading(content, options)
toast.custom(content, options)
toast.dismiss(toastId?: string | number) // 若不传toastId，则dismiss所有的toasts
toast.remove(toastId?: string | number)  // 若不传toastId，则remove所有的toasts
toast.promise(promise, promiseContents, options).then(afterPromiseFulfilled).catch(afterPromiseRejected)
```

**各种类型的duration**

```js
// 单位ms
blank: 4000,
success: 2000,
warn: 2000,
error: 4000,
loading: Infinity,
custom: 4000,
```

**dimiss 和 remove 的区别**

dimiss ：触发消失动画且默认 1 秒后才被移除

remove ：立即移除



**示例**

<code src="./demo/demo1.tsx" />



**类型**

```ts
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
  // 弹出位置，默认值：top-center
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  onClose?: (t?: Toast) => void; // 关闭时的回调函数
}

interface PromiseContents{
  loading: React.ReactNode | (() => React.ReactNode); // pengding 显示的内容
  success: React.ReactNode | ((val: any) => React.ReactNode); // fulfilled 显示的内容，val是resolve的值
  error: React.ReactNode | ((val: any) => React.ReactNode); // rejected 显示的内容，val是reject的值
}
```



| 参数            | 说明                              | 类型                                            | 默认值 |
| --------------- | --------------------------------- | ----------------------------------------------- | ------ |
| content         | 提示内容                          | `React.ReactNode, (val:any) => React.ReactNode` |        |
| options         | 配置选项                          | `Options`                                       |        |
| promiseContents | `toast.promise`三种状态的提示内容 | `PromiseContents`                               |        |



**toast.config**

全局配置默认值

```js
toast.config(config)
```

```ts
interface GlobalConfig {
  //** 默认弹出位置 */
  defaultPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'; // 默认top-center
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
  /** 最大显示数, 超过限制时，最早的消息会被自动关闭 */
  toastLimit?: number; // 默认20
  /** Toaster的挂载位置 */
  getContainer?: () => HTMLElement; // 默认()=>document.body
  /** 使用自定义的容器而不使用内置的toaster作为挂载节点，为true时，除了toastLimit其它属性均无效 */
  customToaster?: boolean;
}
```



### ToastBar

ToastBar 是 toast 的默认容器，自带动画效果，若需改变动画，可通过 `t.visible` 判断，在 `style` 中加入渐进、渐变等其它动画效果

**用法**

```tsx | pure
toast.custom(toast =>
  <ToastBar
    toast={toast}
    content={toast => toast.id}
    style={toast.visible ? enterStyle : exitStyle}
    position="top-center"
  />
)

// or

toast.custom(toast =>
  <ToastBar
    toast={toast}
    style={toast.visible ? enterStyle : exitStyle}
    content={toast => <div style={{ margin: '0 5px' }}>
      {toast.id}
    </div>}
    position="top-center"
  >
    {({ icon, content }) => <>{icon}{content}</>}
  </ToastBar>,
  {
    icon: <span>🧀</span>
  }
)

```



**示例**

<code src="./demo/demo2.tsx" />



### toast-icon

```ts
import {
  ToastIcon,
  CheckmarkIcon,
  WarnIcon,
  ErrorIcon,
  LoaderIcon,
} from './toast';
```

**示例**

```tsx | pure
interface ToastIconProps	{
  type?:'success' | 'warn' | 'error' | 'loading' | 'blank' | 'custom'; // 默认为blank，此时若没传入icon则不显示图标
	icon?:JSX.Element | string; // icon属性优先级最高，会覆盖 type 对应的图标
  iconTheme?: {
    primary: string; // 图标主颜色
    secondary: string; // 图标副颜色
  };
}

// usage
<ToastIcon type='success' />
<CheckmarkIcon primary='#61d345' secondary='#fff' / >
```



### useToaster

useToaster hook 提供 toasts 和 handlers ，可以帮助你自定义 toaster 和管理渲染 toasts

**注意：全局中只能存在一个 toaster ，否则 toast 的偏移距离会冲突**

```ts
const { toasts, handlers } = useToaster(toastOptions);
const { startPause, endPause, updateHeight, calculateOffset } = handlers;
```

- toasts：toast的状态数组
- handlers：提供管理方法

**示例** 

> 先点击第一个按钮设置允许自定义toaster，然后测试再点击第二按钮，测试完最后点击第三个按钮恢复默认设置

<code src="./demo/demo3.tsx" />

<code src="./demo/demo4.tsx" />

### useToasterStore

useToasterStore hook 提供 toasts 和 pausedAt，适用于只获取数据，不渲染 toasts 的情况

- toasts: toast 的状态数组
- pausedAt: 暂停的初始时间戳，为 0 时代表没暂停



## 参考

[timolins/react-hot-toast](https://github.com/timolins/react-hot-toast)
