import { TextInput, View, Text, StyleSheet, Button, TouchableOpacity } from "react-native"
import { useState } from "react"
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { getDatabase, ref, remove, update } from "firebase/database";
import { useRoute } from "@react-navigation/native";

export default function UpdateBairro({ navigation}) {
    const route = useRoute()
    const [nomeBairro, setNomeBairro] = useState(route.params?.nome)
    const [numeroCasos, setNumeroCasos] = useState(String(route.params?.casos))
    

     function atualizarBairro() {
        try {
            const nomeBairroSemEspaco = nomeBairro.trim()
            const numeroCasosSemEspaco = numeroCasos.trim()
           
            if (parseInt(numeroCasosSemEspaco) > 0  && nomeBairroSemEspaco != '') {
                const database = getDatabase()
                const databaseRef = ref(database, 'bairros/' + route.params?.geonameId+'/'+route.params?.id)
                update(databaseRef, { nome: nomeBairroSemEspaco, casos: parseInt(numeroCasosSemEspaco) })
                alert('Bairro Atualizado com sucesso!')
            } else {
                alert("Erro: Por favor, forneça todos os dados necessários para continuar.");
            }



        } catch (e) {
            alert("erro no servidor")
            console.log(e)
        }


    }

    function removeBairro(){
        try{
            const database = getDatabase()
            const databaseRef = ref(database, 'bairros/' + route.params?.geonameId+'/'+route.params?.id)
            remove(databaseRef)
            alert('Bairro Apagado com sucesso!')
            navigation.goBack()

        }catch(e){
            alert("Erro ao apagar bairro")
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
           <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <View style={{width:'40%'}}>
             <Button title="Atualizar" color='#5a9100' onPress={atualizarBairro} />
            </View>
        
            <View View style={{width:'40%'}}>
             <Button title="Apagar" onPress={removeBairro} color='#f12f5d' />
            </View>
            
           </View>
           


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