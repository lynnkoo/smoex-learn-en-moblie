import * as React from 'react'
import { Route } from 'react-router-dom'
import { configureStore } from 'shared/redux-async-kit'
import { Container } from 'shared/react-dom-basic-kit'
import { PageRouter } from 'shared/smoex-moblie-basic/containers/PageRouter'
import { commonSlice } from 'shared/smoex-frontend-basic'
import { Provider } from 'react-redux'
import 'shared/smoex-frontend-basic/styles/index.scss'
import { homeSlice } from 'common/slices/home'
import { createLazyComponent } from 'shared/redux-async-kit'
import { PageLoading } from 'shared/smoex-moblie-basic/containers/PageLoading'

const store = configureStore({
  injector: commonSlice.injector,
})

window['store'] = store

const HomePage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () => import('./containers/HomePage' /* webpackChunkName: "home" */),
})

const SearchPage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () =>
    import('./containers/SearchPage' /* webpackChunkName: "search" */),
})

const WordPage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () => import('./containers/WordPage' /* webpackChunkName: "word" */),
})

const WordListPage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () =>
    import('./containers/WordListPage' /* webpackChunkName: "word-list" */),
})

const WordCardPage = createLazyComponent({
  injector: homeSlice.injector,
  loader: () =>
    import('./containers/WordCardPage' /* webpackChunkName: "word-card" */),
})

export const App: React.FC = () => {
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
