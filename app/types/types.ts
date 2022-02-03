export interface GlobalStore {
  hackerNews: IHackerNews;
}

export interface IHackerNews {
  topStoriesIds: number[];
  randomTopStoriesIds: number[];
  stories: {[id: number]: IStory};
  users: {[id: string]: IUser};
}

export interface IStory {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  // TODO
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
  url: string;
}

export interface IStoryWithUser extends IStory {
  user: IUser;
}

export interface IUser {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
}
