import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getDatabase, ref as refDatabase, push,update,child } from "firebase/database";

export default function AddOcorrencia() {
  const navigation = useNavigation()
  const [descricao, setDescricao] = useState('');
  const [currentRegion, setCurrentRegion] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);
  const [image, setImage] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  function openModal() {
    setModalStatus(!modalStatus);
    console.log(image)
  }

  async function openAlbum() {
    const options = {
      mediaType: "photo",
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: 1,
    };

    let result = await ImagePicker.launchImageLibraryAsync(options);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      openModal();
    }
  }

  async function openCamera() {
    const options = {
      mediaType: "photo",
      quality: 1,
      saveToPhotos: true,
    };

    const result = await ImagePicker.launchCameraAsync(options);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      openModal();
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


  async function adiciona() {
    try {
      await getCurrentLocation();
   
      if (image && descricao && currentRegion) {
        const dataResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${currentRegion.latitude}&longitude=${currentRegion.longitude}&localityLanguage=pt`);
        const dataJson = await dataResponse.json();
  

        const db = getDatabase();
        const dbRef = refDatabase(db, 'ocorrencia/' + dataJson.city);
        const newRef = push(dbRef, { descricao: descricao, latitude: currentRegion.latitude, longitude: currentRegion.longitude, imagem: '' });
  
  
        const imageResponse = await fetch(image);
        const imageBlob = await imageResponse.blob();
  
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + dataJson.city + "/" + newRef.key);
        const snapshot = await uploadBytes(storageRef, imageBlob);
  
        const imageUrl = await getDownloadURL(snapshot.ref);
  
        update(child(dbRef, newRef.key), { imagem: imageUrl });
        console.log('Link da imagem:', imageUrl);
        alert("Ocorrência adicionada com sucesso!")
        navigation.goBack();
        return;
      }
  
      alert("Erro: Dados necessários não estão disponíveis.");
  
    } catch (error) {
      console.error('Erro ao adicionar ocorrência:', error);
      alert("Erro ao adicionar ocorrência. Consulte o console para mais detalhes.");
    }
  }
  

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={style.container}>
        <View style={{ position: 'absolute', top: 0, left: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="return-up-back" size={45} color="grey" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={openModal}>
          <View style={style.cPhoto}>
            <MaterialIcons style={{ position: 'absolute' }} name="photo-camera" size={100} color="grey" />
            {image && <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 500 }} />}
          </View>
        </TouchableOpacity>
        <Text>Clique na Camera para adicionar uma Imagem</Text>

        <View style={{ flex: 1, width: '100%', marginTop: 40 }}>
          <Text style={{ fontSize: 20 }}>Descrição:</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
          >
            <TextInput
              style={style.input}
              multiline
              onChangeText={text => setDescricao(text)}
              value={descricao}
            />
          </KeyboardAvoidingView>
        </View>

        {!isKeyboardVisible && (
          <TouchableOpacity style={style.button} onPress={adiciona} >
            <AntDesign name="pluscircle" size={70} color="grey" />
          </TouchableOpacity>
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalStatus}
        >
          <View style={style.cModal}>
            <View style={{ position: 'absolute', top: 0, left: 10 }}>
              <TouchableOpacity onPress={openModal}>
                <Ionicons name="return-up-back" size={50} color="grey" />
              </TouchableOpacity>
            </View>

            <View style={style.btnContainer}>
              <TouchableOpacity onPress={openCamera} style={style.btnAddPhoto}>
                <MaterialIcons name="photo-camera" size={50} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={openAlbum} style={style.btnAddPhoto}>
                <MaterialIcons name="add-photo-alternate" size={50} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    width: '100%',
    padding: 5,
  },
  container: {
    alignItems: 'center',
    padding: 20,
    flex: 1,
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

  cModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'grey',
    width: 250,
    paddingVertical: 25,
    borderWidth: 2,
    borderRadius: 10,
  },

  btnAddPhoto: {
    borderWidth: 2,
    padding: 4,
    borderRadius: 10,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
});
