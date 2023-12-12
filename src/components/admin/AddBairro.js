import { TextInput, View, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator } from "react-native"
import { useState } from "react"
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { getDatabase, ref, push } from "firebase/database";
import { Modal } from "react-native-paper";

export default function AddBairro({ navigation }) {
    const [nomeBairro, setNomeBairro] = useState('')
    const [numeroCasos, setNumeroCasos] = useState('')
    const [modalStatus, setModalStatus] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);


    async function adicionaBairro() {
        try {
            setButtonDisabled(true);
            const nomeBairroSemEspaco = nomeBairro.trim();
            const numeroCasosSemEspaco = numeroCasos.trim();

            if (parseInt(numeroCasosSemEspaco) > 0 && nomeBairroSemEspaco !== '') {
                const currentRegion = await getCurrentLocation();
                const dataResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${currentRegion.latitude}&longitude=${currentRegion.longitude}&localityLanguage=pt`);
                const dataJson = await dataResponse.json();
                const { localityInfo } = dataJson;
                const { administrative } = localityInfo;
                const cidade = administrative[5];
                const database = getDatabase();
                const databaseRef = ref(database, 'bairros/' + cidade.geonameId);


                push(databaseRef, { nome: nomeBairroSemEspaco, casos: parseInt(numeroCasosSemEspaco) });

                alert('Bairro adicionado com sucesso!');
                navigation.goBack();
            } else {
                alert("Erro: Por favor, forneça todos os dados necessários para continuar.");
            }
        } catch (e) {
            alert("Erro no servidor");
            console.log(e);
        } finally {
            setButtonDisabled(false);
            setModalStatus(false)
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
            <View style={{ position: 'absolute', top: 0, left: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="return-up-back" size={45} color="grey" />
                </TouchableOpacity>
            </View>
            <Text style={style.txt} >Nome do Bairro:</Text>
            <TextInput style={style.input} onChangeText={(txt) => setNomeBairro(txt)} value={nomeBairro} />
            <Text style={style.txt} >Numero de casos:</Text>
            <TextInput style={style.input} value={numeroCasos} onChangeText={(txt) => setNumeroCasos(txt)} keyboardType="numeric" />
            <Button title="Adicionar"  disabled={buttonDisabled} onPress={()=>{
                 setModalStatus(true)
                 adicionaBairro()
            }} />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalStatus}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size={50}/>

                </View>

            </Modal>


        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 50,
        gap: 10
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 5,


    },
    txt: {
        fontSize: 20,
    }
})