import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store/configureStore'

import './index.css'
import App from './containers/App'
import * as serviceWorker from './serviceWorker'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import deepOrange from '@material-ui/core/colors/purple'

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: deepOrange,
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

serviceWorker.register()
