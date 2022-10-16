/* 创建store */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { getTokenInfo } from '@/utils/storage'
// 参数1：reducer
// 参数2：指定store的初始值
// 参数3：指定中间件
const store = createStore(
  reducer,
  {
    login: getTokenInfo(),
  },
  composeWithDevTools(applyMiddleware(thunk))
)

// ReturnType 获取函数类型返回值的类型
export type RootState = ReturnType<typeof store.getState>

export default store
