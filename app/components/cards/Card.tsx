import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IStoryWithUser} from '../../types/types';
import CardWrapper from './CardWrapper';

type CardProps = {
  item: IStoryWithUser;
};

const Card = (props: CardProps) => {
  const {item} = props;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  const onLinkPress = (url: string) => {
    return () => Linking.openURL(url);
  };

  const renderCardContent = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={onLinkPress(item.url)}>
          <Text numberOfLines={2} style={styles.url}>
            {item.url}
          </Text>
        </TouchableOpacity>
        <Text style={styles.timestamp}>
          Timestamp: {formatDate(item.time)} ({item.time})
        </Text>
        <Text style={styles.score}>Score: {item.score}</Text>
        <Text>
          Author id / carma: {item.by} / {item.user.karma}
        </Text>
      </View>
    );
  };
  return <CardWrapper renderContent={renderCardContent} />;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
    marginTop: 6,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    border: 0.5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  url: {
    marginVertical: 5,
    color: 'blue',
  },
  timestamp: {marginVertical: 5},
  score: {
    marginVertical: 5,
  },
});
