import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, useLocation } from 'react-router-dom'
import uuidv4 from 'uuid/v4'
import { ModalLayer } from './ModalLayer'
import { IS_WECHAT_WEBVIEW } from 'shared/smoex-moblie-basic/utils/device'
import { enhancePopupComponent, usePopupShown } from '../components'
import { Toast } from '../components/Toast'

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

export function useToggleToast(text: string) {
  const { toggleToast } = React.useContext(AppContext)
  return React.useCallback(() => {
    toggleToast(text)
  }, [text])
}

export const Container: React.FC<IAppContainerProps> = (props) => {
  const { children, basename } = props
  const [toasts, setToasts] = React.useState([])
  const appContext = {
    toggleToast: (text: string) => setToasts((mToasts) => [...mToasts, text]),
    removeToast: () => setToasts((mToasts) => mToasts.slice(1)),
  }
  return (
    <AppContext.Provider value={appContext}>
      <BrowserRouter basename={basename}>
        <ContainerRoute />
        {toasts.map((toast, i) => (
          <Toast key={i}>{toast}</Toast>
        ))}
        <ModalLayer>{children}</ModalLayer>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
