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