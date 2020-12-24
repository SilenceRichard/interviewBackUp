
1. 提升首屏相关指标

  fp: 白屏时间
  fcp: 首屏时间，页面绘制完第一个dom时出现
  fmp: 首次有效渲染时间

2. 利用React.Profile组件（在commit阶段）测量组件的渲染开销。
3. 用purecomponent或react.memo对props做浅比较，减少render
也可以用shouldComponentUpdate

4. 保证数据的不可变性
5. 使用唯一的key值
6. 不要在render中处理数据
7. 减少不必要的标签， react.fragment

## react解决的问题

1. cpu瓶颈

    GUI线程与js线程是互斥的，react为了突破cpu的瓶颈，在每一帧（假设刷新率为60hz）16.6ms的时间内预留一些时间，预设值是5ms，给js进行脚本执行
2. IO瓶颈

    如何在网络延迟的情况下，减少对网络延迟的感知

    （`Concurrent` 与 `Suspense`)