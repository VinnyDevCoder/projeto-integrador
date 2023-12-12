import 'react-native-gesture-handler';
import { createDrawerNavigator,DrawerToggleButton,DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
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
        drawerLabelStyle:{
          marginLeft:-20,
         },
        headerRight: () => <DrawerToggleButton tintColor='grey' size={30} />,
      }}
      >

        <Drawer.Screen name="Home" component={Home} options={{
           drawerIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}/>
        <Drawer.Screen name="Admin" component={Admin}
        options={{drawerIcon:({color,size})  => <MaterialIcons name="admin-panel-settings" size={size} color={color} />,
      
      }}
        />
      </Drawer.Navigator>
  );
}

