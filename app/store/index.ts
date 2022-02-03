import {configureStore} from '@reduxjs/toolkit';

import hackerNewsReducer from './reducers/hackerNewsReducers';

export default configureStore({
  reducer: {
    hackerNews: hackerNewsReducer,
  },
});
