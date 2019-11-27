import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, useLocation } from 'react-router-dom'
import uuidv4 from 'uuid/v4'
import { ModalLayer } from './ModalLayer'
import { IS_WECHAT_WEBVIEW } from 'shared/smoex-moblie-basic/utils/device'

type IAppContainerProps = {
  basename?: string
  loading?: any
}

function initRootHeight() {
  const innerHeight = window.innerHeight ? window.innerHeight + 'px' : '100vh'
  const rootNode = document.getElementById('root')
  if (!rootNode.style.minHeight) {
    // 初始化 min height， 主要目的为兼容 safari 的 innerHeight
    rootNode.style.minHeight = innerHeight
  } else if (IS_WECHAT_WEBVIEW) {
    // 兼容 wechat 内置浏览器路由切换时 innerHeight 不一致的问题, 路由延迟大概 100 ms
    setTimeout(() => {
      rootNode.style.minHeight = innerHeight
    }, 100)
  }
}

const ContainerRoute: React.FC = () => {
  const { pathname } = useLocation()
  React.useEffect(() => {
    initRootHeight()
  }, [pathname])
  return null
}

export const AppContext = React.createContext<any>(null)

export const Container: React.FC<IAppContainerProps> = (props) => {
  const { children, basename, loading } = props
  const [appContext, setAppContext] = React.useState()
  return (
    <AppContext.Provider value={appContext}>
      <BrowserRouter basename={basename}>
        <ContainerRoute />
        <ModalLayer setAppContext={setAppContext} />
        {appContext ? children : loading}
      </BrowserRouter>
    </AppContext.Provider>
  )
}
