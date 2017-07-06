import { createStore } from 'redux';
import reducers from '../reducers/index';
import ReduxPromise from 'redux-promise';

const store = createStore(
  reducers, 
  {}, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
