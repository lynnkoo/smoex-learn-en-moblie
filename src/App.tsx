import * as React from 'react'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { configureStore, useActionCallback } from 'redux-async-kit'
import { Container, transformStyles } from 'react-dom-basic-kit'
import { PageRouter } from 'smoex-mobile-basic'
import { commonSlice, accountAsyncAction } from 'smoex-common-business'
import { Provider } from 'react-redux'
import { homeSlice } from 'common/slices/home'
import { createLazyComponent } from 'redux-async-kit'
import { PageLoading, Loading } from 'smoex-mobile-basic'
import { commonReducer } from 'smoex-common-business'
import styles from './containers/styles/HomePage.module.scss'
const cx = transformStyles(styles)

const store = configureStore({
  injector: commonSlice.injector,
  reducers: commonReducer,
})

window['store'] = store

const HomePage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () => import('./containers/HomePage' /* webpackChunkName: "home" */),
})

const DetailPage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () => import('./containers/DetailPage' /* webpackChunkName: "search" */),
})

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <BrowserRouter>
          <Route exact path="/" component={HomePage} />
          <Route path="/detail/:id" component={DetailPage} />
        </BrowserRouter>
      </Container>
    </Provider>
  )
}

export default App
