import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './ContextAPI/StoreContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>    
    </BrowserRouter>  
  
)
{/* To set up the React router package we remove ReactStrictMode and add a Browser Router from React Router package */}