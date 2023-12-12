import { useNavigation } from '@react-navigation/native';
import React, {useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, Image, ActivityIndicator, Text } from 'react-native';

export default function ItemOcorrenciaAdmin({ dados,usuario }) {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true);
    const handleLoadStart = () => {
        setIsLoading(true);
    };

    const handleLoadEnd = () => {
        setIsLoading(false);
    };

    function converterData(milissegundos) {
        const data = new Date(milissegundos);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    function reduzirString(string) {
        if (string.length > 15) {
          return string.substring(0, 15 - 3) + '...';
        } else {
          return string;
        }
      }



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{
                if(usuario){
                dados.usuario = usuario
                navigation.navigate('OcorrenciaUsuario',dados)
                    return
                }
                navigation.navigate('Ocorrencia',dados)
                }
                
                } style={{ flexDirection: 'row',  padding: 10, }}>
                {isLoading && <ActivityIndicator size={50} style={styles.loading} />}
                {dados.imagem && <Image
                    style={styles.imagem}
                    source={{ uri: dados.imagem }}
                    onLoadStart={handleLoadStart}
                    onLoadEnd={handleLoadEnd}
                />}
                <View style={{ width: '100%',justifyContent:'center'}}>    
                    <Text>Descrição: {reduzirString(dados.descricao)}</Text>
                    <Text>Data {converterData(dados.data)}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        borderRadius: 10, 
        borderWidth: 1,
        width: '100%',
        marginBottom: 10,
    },
    imagem: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginRight: 10
    },

});
