import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, FlatList, StyleSheet, Text} from 'react-native';
import {batch, useDispatch, useSelector} from 'react-redux';

import {fetchStory, fetchTopStoriesIds, fetchUser} from '../api/requests';
import Card from '../components/cards/Card';
import CardSkeleton from '../components/cards/CardSkeleton';

import actions from '../store/actions/hackerNewsActions';
import {getRandomElementsFromArray} from '../utilities/utils';

import {GlobalStore, IStoryWithUser} from '../types/types';

const {setStories, setTopStoriesIds, setRandomTopStoriesIds, setUsers} =
  actions;

const selectTopStories = (store: GlobalStore) => {
  const randomTopStoriesIds = store.hackerNews.randomTopStoriesIds;
  const stories = store.hackerNews.stories;
  const users = store.hackerNews.users;

  return randomTopStoriesIds.map(id => ({
    ...stories[id],
    user: users[stories[id].by],
  }));
};

function useAppSelector<T>(selector: (state: GlobalStore) => T) {
  return useSelector(selector);
}

const MainScreen = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  // TODO can be rewritter with createSelector?
  const randomTopStories: IStoryWithUser[] = useAppSelector(selectTopStories);
  const dispatch = useDispatch();

  const requestTopStories = useCallback(() => {
    fetchTopStoriesIds().then(async topStoriesIds => {
      const topRandomStoriesIds = getRandomElementsFromArray(topStoriesIds);
      const storyRequests = topRandomStoriesIds.map(id => fetchStory({id}));
      const result = await Promise.all(storyRequests);
      const users = await Promise.all(
        result.map(story => fetchUser({user: story.by})),
      );

      batch(() => {
        dispatch(setTopStoriesIds(topStoriesIds));
        dispatch(setRandomTopStoriesIds(topRandomStoriesIds));
        dispatch(setStories(result));
        dispatch(setUsers(users));
      });
      setDataLoaded(true);
    });
  }, [dispatch]);

  useEffect(() => {
    requestTopStories();
  }, [requestTopStories]);

  const renderStoryCard = ({item}: {item: IStoryWithUser}) => {
    return <Card key={item.id} item={item} />;
  };

  const renderPlaceholder = () => {
    return (
      <>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Text style={styles.title}>Random top HackerNews stories</Text>
      {dataLoaded ? (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContentContainer}
          data={randomTopStories}
          renderItem={renderStoryCard}
        />
      ) : (
        renderPlaceholder()
      )}
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1},
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  list: {},
  listContentContainer: {
    paddingBottom: 10,
  },
});
