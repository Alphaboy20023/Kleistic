import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'boxicons/css/boxicons.min.css'
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter } from "react-router-dom";
// import { SearchProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
      <BrowserRouter>
        <App />
      </ BrowserRouter>
  </Provider>

);


