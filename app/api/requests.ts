const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';

const fetchWrapper = ({url}: {url: string}) => {
  return fetch(`${BASE_URL}${url}`).then(resp => resp.json());
};

export const fetchTopStoriesIds = () => {
  return fetchWrapper({url: 'topstories.json'});
};

export const fetchStory = ({id}: {id: number}) => {
  return fetchWrapper({url: `item/${id}.json`});
};

export const fetchUser = async ({user}: {user: string}) => {
  return fetchWrapper({url: `user/${user}.json`});
};
