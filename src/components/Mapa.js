import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { onValue, ref, getDatabase, get } from "firebase/database";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Mapa() {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [lista, setLista] = useState([])
    const route = useRoute()
    const cordenadas = route?.params


    useEffect(() => {




        getLista()

        return () => {
            getLista()

        }

    }, []);

    async function getCurrentLocation() {
        try {

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                alert("Permission to access location was denied");
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            setCurrentRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });



            return { latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
        } catch (error) {
            console.error("Error getting current location:", error);
        }
    }

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

           

            const snapshot = await get(databaseRef)
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    let ocorrencia = childSnapshot.val()
                    if (ocorrencia.aceito) {
                        ocorrencia.geonameId = cidade.geonameId
                        ocorrencia.id = childSnapshot.key
                        setLista(antList => [ocorrencia, ...antList])
                    }

                }
                )
            }


        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>

            <MapView
                style={styles.map}
                region={cordenadas ? cordenadas : currentRegion}
                loadingEnabled={true}
                showsUserLocation={true}
                zoomEnabled={true}
                minZoomLevel={15}
            >

                {lista && lista.map((ocorrencia, index) => {
                    return (
                        <Marker
                            key={index}
                            coordinate={ocorrencia}
                            title={ocorrencia.descricao}
                        />
                    )

                })
                }

            </MapView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: '100%'
    },
});
