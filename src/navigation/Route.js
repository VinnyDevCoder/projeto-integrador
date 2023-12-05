import 'react-native-gesture-handler';
import { View,Image } from 'react-native';
import { createDrawerNavigator,DrawerToggleButton,DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';


import Home from "./Home"




export default function Route(){
  const Drawer = createDrawerNavigator()

  return (
      <Drawer.Navigator screenOptions={{
        drawerPosition:"right",
        drawerStyle:{backgroundColor:"#262525"},
        headerStyle:{backgroundColor:"#262525",},
        headerLeft: false,
        headerTitleAlign: "center",
        headerTintColor:'grey',
        headerTitle:'InfoEgypti',
        headerRight: () => <DrawerToggleButton tintColor='grey' size={30} />,
      }}
      >

        <Drawer.Screen name="Home" component={Home}/>
      </Drawer.Navigator>
  );
}

