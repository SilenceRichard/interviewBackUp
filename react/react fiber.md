## 老的react架构

 - 协调器 （reconciler)

    递归更新：

      reconciler发现1->2 ,通知renderer

      renderer更新dom，1->2

      reconciler发现3-> 4, 通知renderer

      renderer更新dom，3->4
    ```html
    <li>1</li> -> <li>2</li> 
    <li>3</li> -> <li>4</li> 
    ```

 - 渲染器 （renderer)
    
    - ReactDOM
    - ReactNative
    - ReactTest

## 新的React的架构

  1. react采用链表的形式遍历组件树，每个组件为一个fiber节点
  2. 新增了一层scheduler，实现任务调度分配（高优先级的任务,`键盘输入`等可以打断低优先级的任务`diff`)

  3. fiber调度器(reconciler)的工作原理

      1. 生成`fiber tree`,得到需要更新的节点信息，这个过程可以被打断
      2. 将需要更新的节点一次性批量更新（这个过程不能被打断， for 循环遍历）
    
  调度器由原来的递归实现变为了for循环实现

  fiber 节点

  ```js
  this.return =;
  this.child = ;
  this.sibling =;
  ```
 