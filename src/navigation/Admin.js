
import { createStackNavigator } from "@react-navigation/stack"
import LoginAdmin from "../components/LoginAdmin"
import HomeAdmin from "./HomeAdmin"
import Ocorrencia from "../components/admin/Ocorrencia"
import AddBairro from "../components/admin/AddBairro"
import UpdateBairro from "../components/admin/UpdateBarro"


const Stack = createStackNavigator()
export default function Admin(){
 
    
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginAdmin}/>
            <Stack.Screen name="AreaAdmin" component={HomeAdmin}/>
            <Stack.Screen name="Ocorrencia" component={Ocorrencia}/>
            <Stack.Screen name="AddBairro" component={AddBairro} />
            <Stack.Screen name="UpdateBairro" component={UpdateBairro} />
        </Stack.Navigator>


    )
}