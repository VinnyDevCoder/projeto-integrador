import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Mapa() {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
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
            } catch (error) {
                console.error("Error getting current location:", error);
            }
        }

        getCurrentLocation();

        
    
    }, []);

    return (
        <View style={styles.container}>
       
                <MapView
                    style={styles.map}
                    region={currentRegion}
                    loadingEnabled={true}
                    showsUserLocation={true}
                    zoomEnabled={true}
                    minZoomLevel={15}
                />
          
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
