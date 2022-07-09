// store.js

import { createStore } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// create your reducer
const reducer = (state = { tick: 'init', wallet: { connected: false } }, action) => {
  console.log(action)
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case 'CONNECT_WALLET':
      return { ...state, wallet: action.payload };
    default:
      return state;
  }
};

// create a makeStore function
const makeStore = context => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });