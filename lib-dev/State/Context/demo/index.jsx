import React from 'react'
import ReactDOM from 'react-dom/client'
import { CounterModel } from './models';
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CounterModel.Provider>
      <App />
    </CounterModel.Provider>
  </React.StrictMode>
)