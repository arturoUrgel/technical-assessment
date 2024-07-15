import React from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';

const BlankList = ({first, load}) => {
  const navigation = useNavigation();
  return !load ? (
    <View style={styles.container}>
      <Image
        source={require('../../assets/GalactikosWhite.png')}
        style={styles.image}
        resizeMode="contain"
      />
      {first ? (
        <View style={styles.buttonContainer}>
          <Button
            title="Add Your First Match"
            color={COLORS.primary}
            onPress={() => navigation.navigate('AddMatch')}
          />
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <Icon name="disconnect" size={60} color={COLORS.white} />
        </View>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: COLORS.backgroundLight,
  },
  image: {
    width: '100%', 
    marginBottom: 20,
  },
  buttonContainer: {
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
});

export default BlankList;
