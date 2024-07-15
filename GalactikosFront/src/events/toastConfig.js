import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseToast, ErrorToast} from 'react-native-toast-message';
import {COLORS} from '../utils/colors';

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      contentContainerStyle={styles.contentContainer}
      style={styles.successToast}
      text1Style={styles.text1}
      text2NumberOfLines={0}
      text2Style={styles.text2}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      contentContainerStyle={styles.contentContainer}
      style={styles.errorToast}
      text1Style={styles.text1}
      text2NumberOfLines={0}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 15,
  },
  successToast: {
    backgroundColor: COLORS.succesToast,
    borderLeftColor: COLORS.succesToast,
  },
  errorToast: {
    backgroundColor: COLORS.danger,
    borderLeftColor: COLORS.danger,
  },
  text1: {
    fontSize: 13,
    color: 'white',
  },
  text2: {
    fontSize: 11,
    color: 'white',
    flexWrap: 'wrap',
    maxWidth: '100%',
    flexShrink: 1,
  },
});
