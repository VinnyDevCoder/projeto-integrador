import { StyleSheet, View, TouchableOpacity, Text, FlatList } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { getDatabase, ref, onValue } from "firebase/database";
import ItemBairro from "./ItemBairro";
import { SearchBar } from "react-native-elements";

export default function ListaBairros() {
    const navigation = useNavigation()
    const [lista, setLista] = useState([])
    const [search, setSearch] = useState('');

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
            const databaseRef = ref(database, 'bairros/' + cidade.geonameId)

            onValue(databaseRef, (snapshot) => {
                setLista([])
                snapshot.forEach((childSnapshot) => {
                    let bairro = childSnapshot.val()

                    bairro.geonameId = cidade.geonameId
                    bairro.id = childSnapshot.key
                    setLista(antList => [bairro, ...antList])




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

    const filteredLista = lista.filter(item => item.nome.toLowerCase().includes(search.toLowerCase()));

    return (
        <View style={style.container}>

            {lista.length > 0 &&

                <SearchBar

                    placeholder="Pesquisar bairro..."
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                    containerStyle={style.searchBarContainer}
                    inputContainerStyle={style.searchBarInputContainer}
                />
            }





            {filteredLista.length > 0 ? (



                <FlatList
                    data={filteredLista}
                    renderItem={({ item }) => <ItemBairro dados={item} />}
                />

            ) : (
                <Text style={{ fontSize: 20, width: '100%', textAlign: 'center' }}>Não tem Bairros cadastrados</Text>
            )}

            <View style={style.button}>
                <TouchableOpacity onPress={() => navigation.navigate('AddBairro')}>
                    <AntDesign name="pluscircle" size={70} color="grey" />
                </TouchableOpacity>

            </View>

        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        gap: 10,

    },
    button: {
        position: 'absolute',
        bottom: 40,
        right: 30
    },
    searchBarContainer: {
        backgroundColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    searchBarInputContainer: {
        backgroundColor: 'white',
    }
})