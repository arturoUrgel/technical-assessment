import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, StyleSheet, View, Text} from 'react-native';
import CustomDrawerContent from './components/CustomDrawerContent';
import HomeScreen from './screens/HomeScreen';
import AddMatchForm from './screens/AddMatchForm';
import {COLORS} from './utils/colors';
import HeaderBackground from './components/atoms/HeaderBackground';
import {CONSTANTS} from './utils/constants';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Homes"
      options={{headerShown: false}}
      component={HomeScreen}
    />
  </Stack.Navigator>
);

const AddStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Homes"
      options={{headerShown: false}}
      component={AddMatchForm}
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Drawer.Navigator
        screenOptions={{
          headerTransparent: true,
          headerBackground: () => <HeaderBackground />,
          headerStyle: {
            height: CONSTANTS.headerHeight - 20,
          },
          headerTintColor: 'transparent',
          headerBackTitleVisible: true,
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 700,
            fontSize: 22,
          },
          headerTitleAlign: 'center',
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Statistics" component={HomeStack} />
        <Drawer.Screen name="AddMatch" component={AddStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
