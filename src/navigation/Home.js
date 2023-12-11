import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Mapa from "../components/Mapa"
import { FontAwesome5 } from '@expo/vector-icons'; 
import ListaNavigation from "./ListaNavigation";
import Prevencao from "../components/Prevencao";

const Tab = createBottomTabNavigator()


export default function Home(){
    return(
        <Tab.Navigator screenOptions={{
            headerShown:false,
            tabBarStyle: {backgroundColor:"#262525"},
            tabBarHideOnKeyboard:true
            }}>
            <Tab.Screen name="Mapa" 
             component={Mapa} 
             options={{
                
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="map-marked-alt" size={size} color={color} />
                  )
             }}
             
             />
            <Tab.Screen name="ListaNavigation" 
            component={ListaNavigation}
            options={{
                title:'Lista',
                tabBarIcon:({color,size})=>(<FontAwesome5 name="clipboard-list" size={size} color={color} />)}}
            />
            <Tab.Screen name="Prevencao"
             component={Prevencao}
             options={{
                tabBarLabel:"Prevenção",
                tabBarIcon:({color,size})=>(<FontAwesome5 name="shield-virus" size={size} color={color}/>),
            }}
             />
        </Tab.Navigator>
    )
}