import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../utils/colors';

const CustomDrawerContent = props => {
  const {state} = props;
  const focusedRouteName = state.routeNames[state.index];
  return (
    <View style={styles.container}>
      <View style={styles.brandContainer}>
        <Image
          /* source={require('../assets/GalactikosLogo.webp')} */
          source={require('../assets/GalactikosWhite.png')}
          style={styles.brandLogo}
          alt="Galactikos logo"
        />
      </View>
      <View style={styles.divider} />
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Statistics"
          labelStyle={{color: COLORS.white}}
          focused={focusedRouteName === 'Statistics'}
          onPress={() => props.navigation.navigate('Statistics')}
          icon={({color, size}) => (
            <Icon name={'show-chart'} size={23} color={COLORS.white} />
          )}
        />
        <DrawerItem
          labelStyle={{color: COLORS.white}}
          label="Add Match"
          focused={focusedRouteName === 'AddMatch'}
          onPress={() => props.navigation.navigate('AddMatch')}
          icon={({color, size}) => (
            <Icon name={'add'} size={23} color={COLORS.white} />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.primary,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  brandLogo: {
    width: '90%',
    margin: 'auto',
  },
  divider: {
    marginTop: 45,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomDrawerContent;
