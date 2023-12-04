import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/navigation/Home';



export default function App() {
  const Drawer = createDrawerNavigator()
  return (
    <NavigationContainer >
      <Drawer.Navigator screenOptions={{headerShown:false}}>
        <Drawer.Screen name="Home" component={Home}/>
      </Drawer.Navigator>
    </NavigationContainer>
   
  );
}

