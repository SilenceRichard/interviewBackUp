```jsx
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
funtion App() {
  return (
    <BrowserRouter>
      <Link to='home'> home </Link>
      <Link to='about'> about </Link>
      <Route path='/home' render={()=><div>home</div>}></Route>
            <Route path='/about' render={()=><div>about</div>}></Route>
    </BrowserRouter>
  )
}
ReactDom.render(<App/>, document.getElementById('root'))
```

### BrowserRouter 组件

> BrowserRouter组件主要做的是将当前的路径往下传，并监听popstate事件, 使用context的通信方式

```jsx
const { Consumer, Provider } = React.createContext();
const BrowserRouter: React.FcC = props => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const onChangeView = () => {
    setCurrentPath(window.location.pathname)
  }
  useEffect(() => {
    window.addEvenlistener('popstate', onChangeView)
    return window.removerEventListener('popstate', onChangeView)
  }, [])
  return <Provider value={{currentPath, onChangeView}}>{props.children}</Provider>
}
```

### Route组件

> 根据browserRouter提供的currentPath与props的path做对比，如果相等则render

```jsx
const Route: React.FC<{path: string, render: () => void}> = ({path, render}) => {
  const { currentPath } = useContext(browserRouter.context)
  return <>
    {currentPath === path && render()}
  </>
```

### Link组件

> 拿到props传进来的`to`,通过`pushState()`改变路由状态，再拿到browserRouter传过来的`onChangeView`函数，手动刷新视图

```jsx
const Link: React.FC<{to: string;}>  = ({to}) => {
  const { onChangeView } = useConsumer(context)
  return <a onClick={(e) => { 
    e.preventDefault(); // 取消默认行为
    history.pushState(null, '', to);
    onChangeView();
   }}> </a>
}
```