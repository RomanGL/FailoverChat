import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/configureStore'

import 'bootstrap/dist/css/bootstrap.css'
import App from './containers/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.register()
