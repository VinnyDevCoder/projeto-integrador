
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons'; 
import ListaAdmin from "../components/admin/ListaAdmin";


const Tab = createBottomTabNavigator()

export default function HomeAdmin(){
    return(
        <Tab.Navigator screenOptions={{headerShown:false, tabBarStyle: {backgroundColor:"#262525"}}}>
            <Tab.Screen name="teste"
             component={ListaAdmin}
             options={{title:'Lista',tabBarIcon:({color,size})=>(<FontAwesome5 name="clipboard-list" size={size} color={color} />)}}
             />
           
        </Tab.Navigator>
    )
}
