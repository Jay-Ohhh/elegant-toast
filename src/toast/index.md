---
nav:
  path: /components
---

## Toast

一个简洁易用、支持多方向和自定义内容、样式、icon、promise 、手动关闭的 React **Tosat** 组件，类似于 antd 的 message 和 notification 。

|     Features     | Support |
| :--------------: | :-----: |
|   Icon、emoji    |   ✔️    |
|    Positions     |   ✔️    |
|   Customizable   |   ✔️    |
|     Promise      |   ✔️    |
|  Pause on hover  |   ✔️    |
| Toggle direction |   ✔️    |
|   Manual close   |   ✔️    |

### Getting Started

```bash
npm install elegant-toast
```

**or**

```bash
yarn add elegant-toast
```

**Uasge**

Toasts 从 Toaster 中弹出

- Toaster：烤面包机

- Toast：吐司

```tsx | pure
import toast, { Toaster } from 'elegant-toast';
const message = () => toast('Hello World!');

const App = () => {
  return (
    <div>
      <button onClick={message}>Make me a toast</button>
      <Toaster />
    </div>
  );
};
```

### API

#### toast

组件提供了一些静态方法用于触发 `toast` 弹出，使用方式和参数如下：

```js
toast(content, options)
toast.success(content, options)
toast.error(content, options)
toast.loading(content, options)
toast.custom(content, options)
toast.dismiss(toastId?:string|number)
toast.remove(toastId?:string|number)
toast.promise(promise,contents,options).then(afterPromiseFulfilled).catch(afterPromiseRejected)
```

**类型**

```ts
interface Options {}
```

用法

<code src="./demo/demo1.tsx" />

### Params

| 参数         | 说明                     | 类型      | 默认值  |
| ------------ | ------------------------ | --------- | ------- |
| defaultValue | 可选项，传入默认的状态值 | `boolean` | `false` |

###

DISMISS_TOAST：触发消失动画且默认 1 秒后才被移除

REMOVE_TOAST：立即移除
