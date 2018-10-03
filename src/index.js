import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import 'semantic-ui-css/semantic.min.css'
import './Static/Styles/index.css'
import App from './App'
// import registerServiceWorker from './registerServiceWorker'

require('core-js/es6/string')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// registerServiceWorker()
