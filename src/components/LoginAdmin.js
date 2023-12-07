import { TouchableOpacity } from "react-native"
import { StyleSheet } from "react-native"
import { View, TextInput, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";



export default function LoginAdmin() {
    const [eyeActive,setEyeActive] = useState(true)
    const [email,setEmail] = useState('')
    const [senha,setSenha] = useState('')
    const navigation = useNavigation()

    const login = ()=>{
        const emailSemEspaco = email.trim()
        const senhaSemEspaco = senha.trim()
        if(emailSemEspaco !== "" && senhaSemEspaco !== "" ){
            const auth = getAuth()
            signInWithEmailAndPassword(auth,email,senha).then((userCredential)=>{
              navigation.navigate("AreaAdmin")
            }).catch(error=>{
              alert('Senha ou email incorretos')
              console.log(error)
            })
            return
        }

        alert('Preencha os campos')
     
    }

    return (
        <View style={style.container}>
            <Text style={style.txt}>Login</Text>
            <TextInput style={style.input} value={email} onChangeText={(txt)=>setEmail(txt)} placeholder="Email" />
            <View>
                <TextInput style={style.input}  maxLength={40} placeholder="Senha" value={senha} onChangeText={(txt)=>setSenha(txt)} secureTextEntry={eyeActive} />
                <View style={style.eye}>
                    <TouchableOpacity onPress={()=>setEyeActive(!eyeActive)}>
                       {eyeActive?<Ionicons name="md-eye-sharp" size={24} color="grey" />:<Ionicons name="md-eye-off-sharp" size={24} color="black" />} 
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <TouchableOpacity onPress={login}>
                    <Text style={style.btnLogin}>Login</Text>

                </TouchableOpacity>
            </View>


        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        backgroundColor: '#373b44'
    },
    txt: {
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'white'
    },
    input: {
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 20,
        width: 300,
        color: 'white',
        paddingHorizontal: 10,
        backgroundColor: '#373b44'
    },
    btnLogin: {
        backgroundColor: 'grey',
        paddingVertical: 5,
        paddingHorizontal: 50,
        fontSize: 20,
        borderRadius: 50,
        fontWeight: 'bold',
        marginTop: 30,
        color: '#373b44'
    },
    eye:{
        position:'absolute',
        right:5,
        margin:"auto",
        top:3,
    }
})