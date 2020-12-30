1. 15的diff算法， 对比虚拟dom和真实dom结构，跨层次比较，复杂度为o(n ^ 3)
2. 16的diff算法，采用fibernode的数据结构，每个fiber节点有child，return，sibling三个属性，虚拟dom比较时只比较同层次的节点，复杂度降为o(n)
3. 虚拟DOM的优势在于通过虚拟DOM的比较，最小化真实DOM的操作

```js
if (newchilde.key === key) {
  if (current.elementType === element.type) {
    // update 如果key,type相同，react认为是同一节点，进行更新操作
  }
   else {
     
   }
}
```

4. diff的策略

  - tree diff
  
    react 对树进行分层比较，

  - component diff

    - 如果是同一类型的组件，按照原策略继续比较 Virtual DOM 树即可。
    - 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
    - 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切知道这点，那么就可以节省大量的 diff 运算时间。因此，React允许用户通过shouldComponentUpdate()来判断该组件是否需进行diff算法分析，但是如果调用了forceUpdate方法，shouldComponentUpdate则失效。

  - elememnt diff

  >当节点处于同一层级时，diff 提供了 3 种节点操作，分别为 INSERT_MARKUP (插入)、MOVE_EXISTING (移动)和 REMOVE_NODE (删除)。

  无key 
 ![](https://user-gold-cdn.xitu.io/2019/4/17/16a29eac1af24550?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

  旧集合中包含节点A、B、C和D，更新后的新集合中包含节点B、A、D和C，此时新旧集合进行diff差异化对比，发现B!=A，则创建并插入B至新集合，删除旧集合A;以此类推，创建并插入A、D和C，删除B、C和D。

  有key

  ![](https://user-gold-cdn.xitu.io/2019/4/17/16a2a04743f105c7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

  通过key可以准确地发现新旧集合中的节点都是相同的节点，因此无需进行节点删除和创建，只需要将旧集合中节点的位置进行移动，更新为新集合中节点的位置，此时React 给出的diff结果为:B、D不做任何操作，A、C进行移动操作即可。
