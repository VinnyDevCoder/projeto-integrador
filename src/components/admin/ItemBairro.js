import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function ItemBairro({ dados }) {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity  onPress={()=>navigation.navigate('UpdateBairro',dados)}>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Text style={styles.label}>Bairro:</Text>
                    <Text style={styles.text}>{dados.nome}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Text style={styles.label}>Casos:</Text>
                    <Text style={styles.text}>{dados.casos}</Text>
                </View>

            </TouchableOpacity>
        </View>
    );
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
});
