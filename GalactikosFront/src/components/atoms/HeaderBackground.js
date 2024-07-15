import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';
import {CONSTANTS} from '../../utils/constants';

const HeaderBackground = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    height: CONSTANTS.headerHeight,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
});

export default HeaderBackground;
