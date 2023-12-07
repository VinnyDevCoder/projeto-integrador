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
import { getStorage, ref, getDownloadURL, uploadBytesResumable, } from "firebase/storage";
import { getDatabase, ref as refDatabase, push, update, child } from "firebase/database";
import { ProgressBar } from "react-native-paper";
import { manipulateAsync } from 'expo-image-manipulator';

export default function AddOcorrencia() {
  const navigation = useNavigation()
  const [descricao, setDescricao] = useState('');
  const [modalStatus, setModalStatus] = useState(false);
  const [progressImage, setProgessImage] = useState(0)
  const [isProgessVisible, setProgressVisible] = useState(false)
  const [image, setImage] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

      const isPng = result.assets[0].mediaType === 'image/png';

      const manipulatedImage = await manipulateAsync(
        result.assets[0].uri,
        [],
        { compress: 0.5, format: isPng ? 'png' : 'jpeg' }
      );

      setImage(manipulatedImage.uri);
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

  function openProgessModal() {
    setProgressVisible(!isProgessVisible)
    openModal()
  }

  async function adiciona() {
    try {
      const currentRegion = await getCurrentLocation();
      const descricaoSemEspaços = descricao.trim();

      if (image && descricaoSemEspaços !== "" && currentRegion && !isLoading) {
        setIsLoading(true); // Set loading state to true to prevent multiple clicks
        openProgessModal()

        const dataResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${currentRegion.latitude}&longitude=${currentRegion.longitude}&localityLanguage=pt`);
        const dataJson = await dataResponse.json();
        const { localityInfo } = dataJson;
        const { administrative } = localityInfo;

        const cidade = administrative[5];
        const db = getDatabase();
        const dbRef = refDatabase(db, 'cidades/' + cidade.geonameId);
        const newRef = push(dbRef, { descricao: descricao, latitude: currentRegion.latitude, longitude: currentRegion.longitude, imagem: '', cidade: cidade.name, data: Date.now() });

        const imageResponse = await fetch(image);
        const imageBlob = await imageResponse.blob();

        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + cidade.geonameId + "/" + newRef.key);

        const uploadTask = uploadBytesResumable(storageRef, imageBlob);
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgessImage(progress)
          },
          (error) => {
            console.error('Error during upload:', error);
            openProgessModal()
            alert("Erro durante o upload da imagem.");
          },
          () => {
            openProgessModal()
            console.log('Upload completed');
          }
        );

        const snapshot = await uploadTask;

        const imageUrl = await getDownloadURL(snapshot.ref);

        update(child(dbRef, newRef.key), { imagem: imageUrl });
        alert("Ocorrência adicionada com sucesso!");
        navigation.goBack();
        return;
      }

      alert("Erro: Por favor, forneça todos os dados necessários para continuar.");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar ocorrência.");
    } finally {
      setIsLoading(false); // Reset loading state after the operation is complete
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
              placeholder="Exemplo: Terreno abandonado"
              onChangeText={text => setDescricao(text)}
              value={descricao}
            />
          </KeyboardAvoidingView>
        </View>

        {!isKeyboardVisible && (
          <TouchableOpacity
            style={style.button}
            onPress={adiciona}
            disabled={isLoading} // Disable the button when loading
          >
            <AntDesign name="pluscircle" size={70} color="grey" />
          </TouchableOpacity>
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalStatus}
        >
          {isProgessVisible ? (
            <View style={style.cModal}>
              <View style={{ width: 300 }}>
                <View style={{ alignItems: 'center', width: '100%' }}>
                  <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', }}>{progressImage.toFixed(0)}%</Text>
                </View>
                <ProgressBar progress={progressImage / 100} color='#5fc2c2' />
              </View>
            </View>
          ) : (

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
            )}

        </Modal>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    width: '100%',
    paddingHorizontal: 5,

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
