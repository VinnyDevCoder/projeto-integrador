import { createStackNavigator } from "@react-navigation/stack"
import Lista from "../components/Lista"
import AddOcorrencia from '../components/AddOcorrencia'
import Ocorrencia from "../components/admin/Ocorrencia"

const Stack = createStackNavigator()

export default function ListaNavigation(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Lista" component={Lista}/>
            <Stack.Screen name="AddOcorrencia" component={AddOcorrencia}/>
            <Stack.Screen name="OcorrenciaUsuario" component={Ocorrencia}/>
        </Stack.Navigator>
    )
}