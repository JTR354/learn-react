import {lazy, Suspense} from 'react'

const Other = lazy(() => {
  return import(/** webpackChunkName: otherComponent **/'./otherComponent')
})

const Lazy = props => {
  return <div>
    <h1>lazy</h1>
    <Suspense fallback={<p>loading....</p>}>
      <Other />
    </Suspense>
  </div>
}


export default Lazy

// https://17.reactjs.org/docs/concurrent-mode-suspense.html#using-suspense-in-practice
// Suspense 作用
// 1. 加载异步组件
// 2. 加载异步数据(接口请求)