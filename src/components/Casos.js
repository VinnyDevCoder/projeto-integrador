import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { getDatabase, ref, onValue, get } from "firebase/database";
import * as Location from 'expo-location';
import { PieChart } from "react-native-chart-kit";
import { SearchBar } from "react-native-elements";

export default function Casos() {
    const [lista, setLista] = useState([])
    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [btnActive,setBtnActive] = useState(true)

    useEffect(() => {


        calculaDados()


        return () => calculaDados()
    }, [])

    async function calculaDados() {
        await getLista()
        
        try {
            if (lista.length > 0) {
                let maior = lista[0].casos
                let vermelho = 0
                let amarelo = 0
                let verde = 0

                for (let i = 1; i < lista.length; i++) {
                    if (lista[i].casos > maior) {
                        maior = lista[i].casos
                    }

                }


                for (let bairro of lista) {
                    if (bairro.casos >= maior * 2 / 3) {
                        vermelho++;
                    } else if (bairro.casos >= maior / 3) {
                        amarelo++;
                    } else if (bairro.casos >= 0) {
                        verde++;
                    }

                }

                const newData = [
                    { name: 'Alto', population: (vermelho / lista.length), color: 'red' },
                    { name: 'Medio', population: (amarelo / lista.length), color: 'yellow' },
                    { name: 'Baixo', population: (verde / lista.length), color: 'green' }
                ]

              
                    setData(newData)
              
               





            }

        } catch (e) {
            console.log(e)
        }


    }

    function retornaCor(bairro) {

        if (lista.length > 0) {
            let maior = lista[0].casos

            for (let i = 1; i < lista.length; i++) {
                if (lista[i].casos > maior) {
                    maior = lista[i].casos
                }

            }

            if (bairro.casos >= maior * 2 / 3) {
                return 'red'
            } else if (bairro.casos >= maior / 3) {
                return 'yellow'
            } else if (bairro.casos >= 0) {
                return 'green'
            }


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
            const databaseRef = ref(database, 'bairros/' + cidade.geonameId)

            onValue(databaseRef, (snapshot) => {
                setLista([])
                snapshot.forEach((childSnapshot) => {
                    let bairro = childSnapshot.val()
                    bairro.id = childSnapshot.key
                    setLista(antList => [bairro, ...antList])

                })
            },{
                onlyOnce: true
              })

             


        }
        catch (e) {
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
   



    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    };

    const filteredLista = lista.filter(item => item.nome.toLowerCase().includes(search.toLowerCase()));

    return (
        <View style={{ flex: 1 }} >

            {lista.length > 0 && data.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <SearchBar

                        placeholder="Pesquisar bairro..."
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                        containerStyle={styles.searchBarContainer}
                        inputContainerStyle={styles.searchBarInputContainer}
                    />
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <PieChart
                            data={data}
                            width={300}
                            height={200}
                            accessor="population"
                            chartConfig={chartConfig}
                            paddingLeft="15"
                            backgroundColor="transparent"
                            renderPercentage={({ index, pieChartData }) => {
                                const percentage = (pieChartData[index].population / totalPopulation) * 100;
                                return `${percentage.toFixed(2)}%`;
                            }}
                        />

                    </View>


                    {filteredLista.length > 0 &&
                        <FlatList
                            data={filteredLista}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.container}>

                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Text style={styles.label}>Bairro:</Text>
                                        <Text style={styles.text}>{item.nome}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        <Text style={styles.label}>Casos:</Text>
                                        <Text style={styles.text}>{item.casos}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        <Text style={styles.label}>Nivel :</Text>
                                        <View style={{ width: 20, borderWidth: 1, height: 20, backgroundColor: retornaCor(item), borderRadius: 30 }}>
                                        </View>
                                    </View>


                                </View>

                            )}
                        />

                    }


                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                   {btnActive?<Button title='Ver grafico' onPress={()=>{
                    calculaDados()
                    setBtnActive(false)}}/>:  <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Dados indisponíveis na sua região</Text>} 
                  
                </View>
            )}

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 2,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },
    text: {
        marginBottom: 10,
        color: "#666",
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
