import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Users from './Component/users/Users';

const Navigator = () => {
  const AuthStack = createStackNavigator();
  const RootStack = createStackNavigator();

  const AuthStackScreen = ({navigation}) => (
    <AuthStack.Navigator initialRouteName="Users">
      <AuthStack.Screen
        name="Users"
        component={Users}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );

  const RootStackScreen = () => {
    return (
      <RootStack.Navigator headerMode="none" initialRouteName="Auth">
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      </RootStack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
export default Navigator;
