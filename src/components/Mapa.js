import { View, Text } from "react-native";
import MapView from 'react-native-maps';
import { useEffect, useState } from "react";
import * as Location from 'expo-location'
import { StyleSheet } from "react-native";

export default function Mapa() {
    const [currentRegion, setCurrentRegion] = useState()

    useEffect(() => {

        async function getCurrentRegion() {
            try {
               
                const { status } = await Location.requestForegroundPermissionsAsync()
                if (status !== 'granted') {
                    alert("permisison to acces location was denied")
                    return
                }
                
                const location = await Location.getCurrentPositionAsync({})
                const { latitude, longitude } = location.coords
                
                setCurrentRegion({
                    latitude, longitude, latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
               
            
            } catch (e) {
                console.log(e)
            }

        }

        getCurrentRegion()
    }, [])
    console.log(currentRegion)

    return (
        <View>
            <MapView
            style={style.map}
            region={currentRegion}
            
            />
        </View>
    )
}

const style = StyleSheet.create({
    map:{
        width:"100%",
        height:"100%"
    }
})