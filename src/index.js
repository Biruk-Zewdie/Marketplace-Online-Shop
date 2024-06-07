import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ShoppingCartProvider } from './Context/ShoppingCartContext';
import { AllUsersDataProvider } from './Context/AllUsersDataContext';
import { UserAuthenticationProvider } from './Context/UserAuthenticationContext';
import { AllCategoriesProvider } from './Context/AllCategoriesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserAuthenticationProvider>
      <AllUsersDataProvider>
        <AllCategoriesProvider>

          <ShoppingCartProvider>
            <App />
          </ShoppingCartProvider>
        </AllCategoriesProvider >

      </AllUsersDataProvider>
    </UserAuthenticationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
