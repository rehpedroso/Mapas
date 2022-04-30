import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, PermissionsAndroid, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

const { width, height } = Dimensions.get('screen'); //Para pegar o temanho da tela do usuario.

export default function Localizacao(){
    const [region, setRegion] = useState(null); //Ira começar como null pois ainda não sabe qual é  alatitude e a longitude do usuario para poder ser passada.
    const [markers, setMarkers] = useState([]); // Irá armazenar todos os pingos que forem adicionados, conforme o usuário for clicando.

    useEffect(() => {
        getMyLocalition();
    }, []);

    function getMyLocalition(){
        Geolocation.getCurrentPosition(info => {
            console.log("Latitude", info.coords.latitude) 
            console.log("Longitude", info.coords.longitude)

            setRegion({
                latitude: info.coords.latitude, //Para ter acesso a latitude que o usuario esta passando.
                longitude: info.coords.longitude, //Para ter acesso a longetude que o usuario esta passando.
                latitudeDelta: 0.0922, //Esse valor é passado por padrão, para ter uma melhor precissão.
                longitudeDelta: 0.0421 //Esse valor é passado por padrão, para ter uma melhor precissão.
            })
        },
        () => {console.log("DEU ALGUM ERRO")},{
            enableHighAccuracy: true,
            timeout: 2000, //Esse valor é padrão.
        }) //Irá pegar o pisão do usuário.
    }

    function newMarker(e){
        //console.log(e.nativeEvent.coordinate.latitude);

        let dados = {
            key: markers.length,
            coords: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
            },
            pinColor: "#FF0000" // Cor do pingo que é o marcador.
        }

        setRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        })

        setMarkers(oldArray => [...oldArray, dados]) //Esta sendo passado tudo que ele ja tinha e mais o que foi clicado.
    }

    return(
        <View style={estilos.container}>
            <MapView
                onMapReady={() => {
                    Platform.OS === 'android'?
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                        .then(() => {
                            console.log("Usuario Aceitou !!")
                        })
                    : ''
                }} //Quando o mapa estiver carregando, é sempre bom pedir permissão para o usuario, para poder acessar a sua localização.
                style={estilos.map}
                region={region}
                zoomEnabled={true} //Para que seja possivel dar zoom.
                minZoomLevel={0} //Mínimo de zoom possivel (diminuir o zoom).
                showsUserLocation={true} //Irá mostrar a bolinha de onde ele esta no mapa, essa bolinha irá aparecer canto superior direito, assim que ela foi acionada, já irá redirecionar para onde o usuário está no mapa.
                loadingEnabled={true} //Se o mapa estiver carregando, isso será mostrado.
                onPress={(e) => newMarker(e)}
            >
                {markers.map(marker => {
                    return(
                        <Marker
                            key={marker.key}
                            coordinate={marker.coords}
                            pinColor={marker.pinColor}
                        /> //O que foi importado no react-native-maps.
                    )
                })}
            </MapView>
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    titulo: {
        fontSize: 20,
        marginTop: 30,
    },
    map: {
        width: width,
        height: height
    }
});