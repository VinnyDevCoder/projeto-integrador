import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { Button } from "react-native";
import { Modal } from "react-native";
import { useState } from "react";
import { getDatabase, ref, set, update, remove } from "firebase/database";


export default function Ocorrencia({ navigation }) {
    const route = useRoute()
    const [modalStatus, setModalStatus] = useState(false);
    const [status, setStatus] = useState(false);

    function openModal(aceito) {
        setStatus(aceito)
        setModalStatus(!modalStatus);

    }

    function aceitarOcorrencia(geoId) {

        try {
            if (geoId) {
                const { cidade, data, descricao, imagem, latitude, longitude } = route.params
                const database = getDatabase()
                const databaseRef = ref(database, 'cidades/' + geoId + '/' + route.params.id)
                update(databaseRef, { cidade, data, descricao, imagem, latitude, longitude, aceito: true })
                setModalStatus(!modalStatus);
                navigation.goBack()
            }

        } catch (e) {

            console.log(e)
        }

    }

    function recusarOcorrencia(geoId) {

        try {
            if (geoId) {
                const { cidade, data, descricao, imagem, latitude, longitude } = route.params
                const database = getDatabase()
                const databaseRef = ref(database, 'cidades/' + geoId + '/' + route.params.id)
                remove(databaseRef, { cidade, data, descricao, imagem, latitude, longitude, aceito: true })
                setModalStatus(!modalStatus);
                navigation.goBack()
            }

        } catch (e) {

            console.log(e)
        }

    }


    return (
        <View style={style.container}>
            <View style={{ position: 'absolute', top: 0, left: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="return-up-back" size={45} color="grey" />
                </TouchableOpacity>
            </View>
            <View style={style.cPhoto}>
                <Image style={{ width: '100%', height: '100%', borderRadius: 500 }} source={{ uri: route.params?.imagem }} />
            </View>

            <Text style={{ fontSize: 20, width: '100%', marginBottom: 20 }}>Descrição:</Text>
            <Text style={style.desc} > {route.params?.descricao}</Text>
            <View style={{margin:10}}>
            <Button onPress={()=>{
                const {latitude,longitude}=  route.params
               
                navigation.navigate('Mapa',{latitude,longitude, latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,usuario:route.params?.usuario,descricao:route.params.descricao})
            }} title="Ver no mapa"/>
            </View>
            
            {!(route.params?.usuario) && (
                <View>
                    <View style={{ flexDirection: 'row', gap: 50, marginTop: 20 }}>
                        <Button onPress={() => openModal(true)} title="Confirmar" color="#00c176" />
                        <Button onPress={() => openModal(false)} title="Recusar" color="#fc1a1a" />
                    </View>



                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalStatus}
                    >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>

                            {status ? (
                                <View style={{ gap: 20, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 20 }}>Deseja Confirmar a Ocorrência?</Text>
                                    <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
                                        <View style={{ width: 100 }}>
                                            <Button title="Sim" onPress={() => aceitarOcorrencia(route.params?.geonameId)} color="#00c176" />
                                        </View>
                                        <View style={{ width: 100 }}>
                                            <Button title="Não" onPress={() => setModalStatus(!modalStatus)} color="#fc1a1a" />
                                        </View>
                                    </View>
                                </View>) : (
                                <View style={{ gap: 20, backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                                    <Text style={{ fontSize: 20 }}>Deseja Recusar a Ocorrência?</Text>
                                    <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', }}>
                                        <View style={{ width: 100 }}>
                                            <Button title="Sim" onPress={() => recusarOcorrencia(route.params?.geonameId)} color="#00c176" />
                                        </View>
                                        <View style={{ width: 100 }}>
                                            <Button title="Não" onPress={() => setModalStatus(!modalStatus)} color="#fc1a1a" />
                                        </View>
                                    </View>


                                </View>
                            )}


                        </View>
                    </Modal>

                </View>
            )}


        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center'
    },
    cPhoto: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderRadius: 500,
        borderWidth: 5,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,

    },

    desc: {
        borderBottomWidth: 1,
        width: '100%',
        paddingHorizontal: 5,

    }
})