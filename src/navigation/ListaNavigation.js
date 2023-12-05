import { createStackNavigator } from "@react-navigation/stack"
import Lista from "../components/Lista"
import AddOcorrencia from '../components/AddOcorrencia'

const Stack = createStackNavigator()

export default function ListaNavigation(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Lista" component={Lista}/>
            <Stack.Screen name="AddOcorrencia" component={AddOcorrencia}/>
        </Stack.Navigator>
    )
}