import { TouchableOpacity } from "react-native"
import { StyleSheet,FlatList } from "react-native"
import { View } from "react-native"
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { getDatabase,onValue,ref } from "firebase/database";
import * as Location from 'expo-location';
import { useState,useEffect } from "react";
import ItemOcorrenciaAdmin from "./admin/ItemOcorrenciaAdmin";


export default function Lista(){
    const navigation = useNavigation()



    const [lista, setLista] = useState([])

    useEffect(() => {
        getLista()

        return () => getLista()

    }, [])

    async function getLista() {
        try {
            const currentRegion = await getCurrentLocation()
            const dataResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${currentRegion.latitude}&longitude=${currentRegion.longitude}&localityLanguage=pt`);
            const dataJson = await dataResponse.json();
            const { localityInfo } = dataJson;
            const { administrative } = localityInfo;
            const cidade = administrative[5];
            const database = getDatabase()
            const databaseRef = ref(database, 'cidades/' + cidade.geonameId)
            
            onValue(databaseRef, (snapshot) => {
                setLista([])
                snapshot.forEach((childSnapshot) => {
                    let ocorrencia = childSnapshot.val()
                    if(ocorrencia.aceito){
                        ocorrencia.geonameId = cidade.geonameId
                        ocorrencia.id = childSnapshot.key
                        setLista(antList => [ocorrencia,...antList])
                    }
                   
                   

                }
                )
            })
    
            
        } catch (e) {
            alert(e)
        }
    }

    async function getCurrentLocation() {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                alert("Permission to access location was denied");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            const region = {
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
            return region
        } catch (error) {
            console.error("Error getting current location:", error);
        }
    }

   




    return(
    <View style={style.container}>
        {lista? <FlatList
          data={lista}
          showsVerticalScrollIndicator={false}

          renderItem={({item}) => <ItemOcorrenciaAdmin usuario={true} dados={item}/>}
      
          />:<Text>Não tem ocorrências na sua cidade</Text>}
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
        padding:10
    },
    button:{
        position:'absolute',
        bottom:40,
        right:30
    }
})