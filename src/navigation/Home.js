import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Mapa from "../components/Mapa"

import { FontAwesome5 } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator()


export default function Home(){
    return(
        <Tab.Navigator screenOptions={{headerShown:false,tabBarStyle: {backgroundColor:"#262525"}}}>
            <Tab.Screen name="Mapa" 
             component={Mapa} 
             options={{
                
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="map-marked-alt" size={size} color={color} />
                  )
             }}
             
             />
            <Tab.Screen name="Lista" 
            component={Mapa}
            options={{
                tabBarIcon:({color,size})=>(<FontAwesome5 name="clipboard-list" size={size} color={color} />)}}
            />
            <Tab.Screen name="Prevencao"
             component={Mapa}
             options={{
                tabBarLabel:"Prevenção",
                tabBarIcon:({color,size})=>(<FontAwesome5 name="shield-virus" size={size} color={color}/>),
            }}
             />
        </Tab.Navigator>
    )
}