import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';

// Global axios defaults
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common.Authorization = 'YOUR_AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use((request) => {
  console.log('[Request]', request);
  // Do something before request is sent
  // You can also edit request congig here before you return it.
  // That's the idea behind the interceptor.
  // For example you can add headers and so on.
  return request;
}, (error) => {
  console.log('[Request global error]', error);
  return Promise.reject(error);
  /*
  We should also return promise reject error here though so that we still forward it to
  our request as you wrote it in a component where
  we can handle it again with the catch method does make sense if you
  have some local task you want to do like show something on the UI
  but also globally you want to log  it in the log file
  which you send to a server or something like that.
  A very common use case is for the request interceptor
  to add some coomon headers. For example an authorization header.
  */
});

axios.interceptors.response.use((response) => {
  console.log('[Response]', response);
  return response;
}, (error) => {
  console.log('[Response global error]', error);
  return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));
