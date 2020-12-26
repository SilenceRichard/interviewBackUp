# h5的pushState与replaceState

> h5引入了`history.pushState`和`history.replaceState`方法，它们分别可以添加和修改历史记录条目，通常与`window.onpopstate`一起使用

### history.pushState

  1. 用户输入在控制台`history.pushState(state, title, url)`
  2. 此时浏览器地址栏改变，但不会导致浏览器加载
  3. 此时用户访问 http://www.baidu.com, 再进行回退操作，此时地址栏显示pushState的url， 触发`popState事件`， 可以拿到stateobj
  4. 再次回退，浏览器显示之前的页面，触发`popState事件`， stateobj为null

### popstate事件

>`popstate`事件只会在浏览器某些行为下触发， 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法)。

  