import React from 'react';
import {StyleSheet, View} from 'react-native';

type CardWrapperProps = {
  renderContent: () => JSX.Element;
};

const CardWrapper = (props: CardWrapperProps) => {
  const {renderContent} = props;

  return <View style={styles.container}>{renderContent()}</View>;
};

export default CardWrapper;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
