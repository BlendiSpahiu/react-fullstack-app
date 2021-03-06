import React from 'react';
import ReactDOM from 'react-dom/client';
import '@ornio-no/ds/style.css';
import App from './App';
import './initializers/dayjs/dayjs';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql/client';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
