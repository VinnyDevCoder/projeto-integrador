import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { onValue, ref, getDatabase } from "firebase/database";
import * as Location from 'expo-location';
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import ItemOcorrenciaAdmin from "./ItemOcorrenciaAdmin";



export default function ListaAdmin() {

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
                    
                    setLista(antList => [childSnapshot.val(),...antList])
                   

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

   

    return (
        <View style={style.container}>
          <FlatList
          data={lista}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ItemOcorrenciaAdmin dados={item}/>}
          />
    
        </View >
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding:10,
       
    }
})