# React 中 key的作用

### React会根据key值判断组件需要`更新`还是`重新渲染`

- 如果key值相同，则react会更新组件对应的属性

- 如果key值不同，则react会销毁组件，并重新渲染

### 不要使用index为key值

eg： 

```js
[a,b,c].map((item, index) => <li key={index}>
  {item} <input value={index} />
</li>);

<li key={1}>a <input value={1}> </li>
<li key={2}>b <input value={2}> </li>
<li key={3}>c <input value={3}> </li>
```

现在对数组乱序[c, b, a]
```js
<li key={1}>c <input value={1}> </li>
<li key={2}>b <input value={2}> </li>
<li key={3}>a <input value={3}> </li>
```

>react监听到相应的item值改变，但input的value没有发生变化！


### 不要使用Math.random()作为key值

`不稳定的key`会导致许多组件实例被不停地重新创建，增加不必要的开销

### 使用稳定且唯一的key值

```js
// 定义全局变量 one
var one = 0;
// 在设置key时， key={one ++}
```