
import { createStackNavigator } from "@react-navigation/stack"
import LoginAdmin from "../components/LoginAdmin"
import HomeAdmin from "./HomeAdmin"


const Stack = createStackNavigator()
export default function Admin(){
    
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginAdmin}/>
            <Stack.Screen name="AreaAdmin" component={HomeAdmin}/>
        </Stack.Navigator>


    )
}