import {createSlice, CaseReducer, PayloadAction} from '@reduxjs/toolkit';
import {IHackerNews, IStory, IUser} from '../../types/types';

const setStories: CaseReducer<IHackerNews, PayloadAction<IStory[]>> = (
  state,
  action,
) => {
  action.payload.forEach(story => {
    const id = story.id;
    state.stories[id] = story;
  });
};

const setUsers: CaseReducer<IHackerNews, PayloadAction<IUser[]>> = (
  state,
  action,
) => {
  action.payload.forEach(user => {
    const id = user.id;
    state.users[id] = user;
  });
};

export const hackerNewsSlice = createSlice({
  name: 'counter',
  initialState: {
    topStoriesIds: [],
    randomTopStoriesIds: [],
    stories: {},
    users: {},
  } as IHackerNews,
  reducers: {
    setTopStoriesIds: (state, action) => {
      state.topStoriesIds = action.payload;
    },
    setRandomTopStoriesIds: (state, action) => {
      state.randomTopStoriesIds = action.payload;
    },
    setStory: (state, action) => {
      const id = action.payload.id;
      state.stories[id] = action.payload;
    },
    setStories,
    setUsers,
  },
});

const actions = hackerNewsSlice.actions;
const reducers = hackerNewsSlice.reducer;

export {actions, reducers};
