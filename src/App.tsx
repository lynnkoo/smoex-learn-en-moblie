import * as React from 'react'
import { Route } from 'react-router-dom'
import { configureStore, useActionCallback } from 'redux-async-kit'
import { Container, useToastError } from 'react-dom-basic-kit'
import { PageRouter } from 'smoex-mobile-basic'
import { commonSlice, accountAsyncAction } from 'smoex-common-business'
import { Provider } from 'react-redux'
import { homeSlice } from 'common/slices/home'
import { createLazyComponent } from 'redux-async-kit'
import { PageLoading, Loading } from 'smoex-mobile-basic'
import { commonReducer } from 'smoex-common-business'

const store = configureStore({
  injector: commonSlice.injector,
  reducers: commonReducer,
})

window['store'] = store

const HomePage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () => import('./containers/HomePage' /* webpackChunkName: "home" */),
})

const SearchPage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () => import('./containers/SearchPage' /* webpackChunkName: "search" */),
})

const WordPage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () => import('./containers/WordPage' /* webpackChunkName: "word" */),
})

const WordListPage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () => import('./containers/WordListPage' /* webpackChunkName: "word-list" */),
})

const WordCardPage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () => import('./containers/WordCardPage' /* webpackChunkName: "word-card" */),
})

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Container>
        <PageRouter>
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/word/list" component={WordListPage} />
          <Route path="/word/card" component={WordCardPage} />
          <Route path="/word" component={WordPage} />
        </PageRouter>
      </Container>
    </Provider>
  )
}

export default App
