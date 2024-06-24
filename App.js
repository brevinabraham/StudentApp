import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import screens from './app/screens/index';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LoginScreenWelcome'>
          <Stack.Screen
            name='LoginScreenWelcome'
            component={screens.LoginScreenWelcome}
            options={{headerShown: false}}/>
          <Stack.Screen
            name='StudentRegister'
            component={screens.StudentRegister}
            options={{headerShown: false}}/>
          <Stack.Screen
            name = 'Dashboard'
            component = {screens.Dashboard}
            options={{headerShown: false}}
            // listeners={{
            //   beforeRemove: (e) => {
            //     e.preventDefault();
            //     e.navigation.replace('Dashboard');
            //   }
            // }}
            />
          </Stack.Navigator>
      </NavigationContainer>
  );
}


