import { hasToken } from '@/utils/storage'
import React from 'react'
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {
  // any:组件props可以接受任意类型
  component: React.ComponentType<any>
}

export default function AuthRoute({ component: Component, ...rest }: Props) {
  const location = useLocation()
  // console.log(location)
  return (
    <Route
      {...rest}
      render={() => {
        if (hasToken()) {
          return <Component></Component>
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  // 从哪儿来的
                  from: location.pathname,
                },
              }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
