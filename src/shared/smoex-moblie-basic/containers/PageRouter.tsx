import * as React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { useActionCallback } from 'shared/redux-async-kit'
import { accountAsyncAction } from 'shared/smoex-frontend-basic/logics/account'
import { Footer } from './Footer'
import { PageError } from './PageError'
import { PageLoading } from './PageLoading'
import { commonSlice } from 'shared/smoex-frontend-basic'
import { Install } from './Install'
import { BROWSER_INFO } from 'shared/react-dom-basic-kit/utils'
import { IS_QQ_WEBVIEW } from '../utils/device'
import { Controller } from './Controller'

const PageContext = React.createContext<any>(null)

const DEFALUT_PAGE_PROPS = {
  showHeader: true,
  showFooter: true,
  showInstall: true,
}

function useInitLoading() {
  const [getInfo] = commonSlice.useAction(accountAsyncAction.getInfo)
  const [loading, setLoading] = React.useState(true)
  const [onGetInfo, error] = useActionCallback(async () => {
    await getInfo()
    setLoading(false)
  })
  React.useEffect(() => {
    if (error) {
      setLoading(false)
    }
  }, [error])

  React.useEffect(() => {
    onGetInfo()
  }, [])
  return loading
}

export const PageRouter: React.FC<any> = (props) => {
  const { children } = props
  const [pageProps, setPageProps] = React.useState(DEFALUT_PAGE_PROPS)
  const loading = useInitLoading()
  const [pageContext] = React.useState({
    setPageProps: (pageProps: any) =>
      setPageProps((mProps) => ({ ...mProps, ...pageProps })),
  })
  const { showHeader, showFooter, showInstall } = pageProps

  return (
    <PageContext.Provider value={pageContext}>
      {showInstall && <Install />}
      {showHeader && <Header />}
      {loading ? (
        <PageLoading />
      ) : (
        <React.Suspense fallback={<PageLoading />}>
          <Switch>
            {false ? <PageError code={500} /> : children}
            <Route render={() => <PageError code={404} />} />
          </Switch>
          {showFooter && <Footer />}
        </React.Suspense>
      )}
      {!loading && <Controller />}
    </PageContext.Provider>
  )
}

export function usePageProps(pageProps: any) {
  const { setPageProps } = React.useContext(PageContext)
  React.useEffect(() => {
    setPageProps(pageProps)
    return () => {
      setPageProps(DEFALUT_PAGE_PROPS)
    }
  }, [])
}
