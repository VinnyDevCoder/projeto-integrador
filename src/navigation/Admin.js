
import { createStackNavigator } from "@react-navigation/stack"
import LoginAdmin from "../components/LoginAdmin"
import HomeAdmin from "./HomeAdmin"
import Ocorrencia from "../components/admin/Ocorrencia"


const Stack = createStackNavigator()
export default function Admin(){
    
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginAdmin}/>
            <Stack.Screen name="AreaAdmin" component={HomeAdmin}/>
            <Stack.Screen name="Ocorrencia" component={Ocorrencia}/>
        </Stack.Navigator>


    )
}