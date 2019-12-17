import * as React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, useLocation } from 'react-router-dom'
import uuidv4 from 'uuid/v4'
import { ModalLayer } from './ModalLayer'
import { enhancePopupComponent, usePopupShown } from '../components'
import { Toast } from '../components/Toast'

type IAppContainerProps = {
  basename?: string
  loading?: any
}

export const AppContext = React.createContext<any>(null)

export function useToastError(error: any) {
  const toggleToast = useToggleToast(error && (error.info || error.message))
  React.useEffect(() => {
    if (error) {
      toggleToast()
    }
  }, [error])
}

export function useToggleToast(text?: string) {
  const { toggleToast } = React.useContext(AppContext)
  return React.useCallback(
    (msg?: any) => {
      toggleToast(typeof msg === 'string' ? msg : text)
    },
    [text],
  )
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
        {toasts.map((toast, i) => (
          <Toast key={i}>{toast}</Toast>
        ))}
        <ModalLayer>{children}</ModalLayer>
      </BrowserRouter>
    </AppContext.Provider>
  )
}
