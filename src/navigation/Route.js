import 'react-native-gesture-handler';
import { createDrawerNavigator,DrawerToggleButton,DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';


import Home from "./Home"
import Admin from './Admin';




export default function Route(){
  const Drawer = createDrawerNavigator()

  return (
      <Drawer.Navigator screenOptions={{
        drawerPosition:"right",
        drawerStyle:{backgroundColor:"#262525"},
        headerStyle:{backgroundColor:"#262525",},
        headerLeft: false,
        drawerInactiveTintColor:'grey',
        headerTitleAlign: "center",
        headerTintColor:'grey',
        headerTitle:'InfoEgypti',
        headerRight: () => <DrawerToggleButton tintColor='grey' size={30} />,
      }}
      >

        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Admin" component={Admin}/>
      </Drawer.Navigator>
  );
}

