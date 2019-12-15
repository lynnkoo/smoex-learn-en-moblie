import { createEpicMiddleware } from 'redux-observable'
import { compose, applyMiddleware, createStore, combineReducers, Store } from 'redux'
import { asyncMiddleware } from './async'
import { formatReducers } from './injector'
import { composeWithDevTools } from 'redux-devtools-extension'
import loggerMiddleware from 'redux-logger'

type StoreInstance = Store & {
  asyncReducers: any
}

export let storeInstance: StoreInstance | undefined

function createDefaultMiddleware() {
  return [asyncMiddleware, composeWithDevTools, loggerMiddleware]
}

export function configureStore(configure: any = {}, initialState = {}) {
  const { epics, middlewares = [], reducers = {}, injector } = configure
  // configure middlewares
  const defaultMiddlewares: any[] = createDefaultMiddleware()
  const asyncReducers: any = formatReducers(reducers)
  const runEpics = epics && epics.length > 0
  const epicMiddleware = createEpicMiddleware()
  if (runEpics) {
    defaultMiddlewares.push(epicMiddleware)
  }

  const combinedMiddlewares = [...defaultMiddlewares, ...middlewares]
  // compose enhancers
  const enhancer = compose(applyMiddleware(...combinedMiddlewares))

  const combinedReducers = combineReducers({ ...asyncReducers })
  // create store
  const store = createStore(combinedReducers, initialState, enhancer)

  if (runEpics) {
    epicMiddleware.run(epics)
  }
  storeInstance = { ...store, asyncReducers }

  if (injector) {
    injector()
  }
  return store
}
