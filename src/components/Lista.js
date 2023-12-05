import { TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"
import { View } from "react-native"
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";



export default function Lista(){
    const navigation = useNavigation()
    return(
    <View style={style.container}>
        <View style={style.button}>
        <TouchableOpacity onPress={()=>navigation.navigate('AddOcorrencia')}>
        <AntDesign name="pluscircle" size={70} color="grey" />
        </TouchableOpacity>

        </View>
       
    </View>
    )
}


const style = StyleSheet.create({
    container:{
        flex:1,
    },
    button:{
        position:'absolute',
        bottom:40,
        right:30
    }
})