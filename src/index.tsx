import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './app/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// import React from 'react'
// import ReactDOM from 'react-dom'

// import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom'

// function App() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/topics">Topics</Link>
//           </li>
//         </ul>

//         <hr />

//         <Route exact path="/" component={Home} />
//         <Route path="/about" component={About} />
//         <Route path="/topics" component={Topics} />
//       </div>
//     </Router>
//   )
// }

// function Home() {
//   const {pathname} =  useLocation()
//   console.log(pathname)
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   )
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   )
// }

// function Topics({ match }: any) {
//   return (
//     <div>
//       <h2>Topics</h2>
//       <ul>
//         <li>
//           <Link to={`${match.url}/rendering`}>Rendering with React</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>

//       <Route path={`${match.path}/:topicId`} component={Topic} />
//       <Route exact path={match.path} render={() => <h3>Please select a topic.</h3>} />
//     </div>
//   )
// }

// function Topic({ match }: any) {
//   return (
//     <div>
//       <h3>{match.params.topicId}</h3>
//     </div>
//   )
// }

// ReactDOM.render(<App />, document.getElementById('root'))
