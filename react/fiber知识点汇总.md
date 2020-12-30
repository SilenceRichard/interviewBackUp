## 核心代码

### workLoop
  
  使用类似于`requestIdleCallback`的api实现执行，暂停逻辑

  ```js
    let  nextUnitOfWork = null;
    function workLoop(deadline) {
      // 当浏览器有空闲时间时执行
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  ```

### performUnitOfWork

      最初我们的实现：
      1. 添加元素至fiber dom
      2. 为元素的child节点创建fiber
      3. 选择下一个单元任务
  
    
  ```js
    function performUnitOfWokr(fiber) {
      //TODO: add dom node
      //TODO: create new fibers
      //TODO: return next unit of work 
    }
  ```

  存在的问题：可能会显示不完整的`ui`

### render & commit

  在render函数中跟踪进行中的root fiber，我们称为`wipRoot`。

  ```js
    function render(element, container) {
      wipRoot = {
        // ...
      }
      nextUnitOfWork = wipRoot;
    }
  ```
    
    一旦我们完成所有任务（`nextUnitOfWork === null`)时，我们将`commit`所有任务，将整个`fiber tree`commit至dom

  ```js
    function commitRoot() {
      commitWork(wipRoot.child);
      wipRoot = null;
    }
    function commitWork(fiber) {
      if (!fiber) {
        return;
      }
      const domParent = fiber.parent.dom;
      domParent.appendChild(fiber.dom);
      commitWork(fiber.child);
      commitWork(fiber.sibling);
    } 
  ```

### Reconciliation 调度

> 至今我们做了将节点添加至dom的操作，但万一有`更新`或`删除`呢
>
> 我们需要拿到我们在`render`中得到的元素，与我们上次`commit`到DOM的`fiber tree`做对比。
> 
> 我们在完成一个`commit`时，用一个变量记录当前提交的fiber tree,我们称为`currentRoot`
> 
> 我们也会在每个`wipRoot`用一个`alternate`属性记录`currentRoot`,这个属性是记录当前我们提交的fiber的上一次fiber tree的状态

```js
  function performUnitOfWork(fiber) {
    const elements = fiber.props.children
    reconcileChildren(fiber, elements)
  }
  function reconcileChildren(wipFiber,elements) {
    let index = 0;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    while (index <= elments.length || oldFiber !== null)
      {
        const element = elements[index];
        // TODO compare oldFiber to element
      }
  }
```

#### 比较diff

  - 如果是相同type,更新节点，打上`UPDATE`的标签
  - 如果新的element存在, 并且是不同的type，新增节点，打上`PLACEMENT`的标签
  - 如果旧的fiber节点存在，并且是不同的type，删除旧节点，打上`DELETION`的标签
```js
  const sameType = oldFiber && element && element.type === oldFiber.type;
  if (sameType) {
    // TODO update the node
  }
  if (element && !sameType) {
    // TODO add this node
  }
  if (oldFiber  && !sameType) {
    // TODO delete the oldFiber's node
  } 
```

#### 有key与无key的对比

  1. 无key: 交互相同type的B,C节点：遍历B,C
        
      - 发现C和B type相同，更新B -> C
      - 发现B和C type相同，更新C -> B

  2. 有key: 发现B,C都为update, 交互B,C 