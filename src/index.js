import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';
import { RecoilRoot } from 'recoil';

axios.defaults.baseURL = "https://vercel.live/link/backend-ljg606e5p-firda-rahayus-projects.vercel.app?via=deployment-domains-list-commit/api/api"
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('tokenUser')}`
  return config
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

