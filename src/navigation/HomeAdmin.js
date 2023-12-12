
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from '@expo/vector-icons'; 
import ListaAdmin from "../components/admin/ListaAdmin";
import ListaBairros from "../components/admin/ListaBairros";
import { MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator()

export default function HomeAdmin(){
    return(
        <Tab.Navigator screenOptions={{headerShown:false, tabBarStyle: {backgroundColor:"#262525"}}}>
            <Tab.Screen name="teste"
             component={ListaAdmin}
             options={{title:'Lista',tabBarIcon:({color,size})=>(<FontAwesome5 name="clipboard-list" size={size} color={color} />)}}
             />
             <Tab.Screen
             component={ListaBairros}
             name="ListaBairro"
             options={{
                title:'Bairros',
                tabBarIcon:({color,size}) => (<MaterialIcons name="add-road" size={size} color={color} />)
             }}
             />
           
        </Tab.Navigator>
    )
}
