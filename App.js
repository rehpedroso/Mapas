/* Para esse codigo, foi necessario fazer algumas instalações do react-native:
=> react-native-maps: https://github.com/react-native-maps/react-native-maps
- npm install react-native-maps - comando para fazer a instalação
- playServicesVersion = "17.0.0", androidMapsUtilsVersion = "xxx" - foi acrescentado esses dois campos no arquivo 'build.gradle' e a versão do 'androidMapsUtilsVersion' é possivel pegar nesse site https://mvnrepository.com/artifact/com.google.maps.android/android-maps-utils, sempre pegar a ultima versão, ou seja, a versão mais recenete.
- Precisa adicionar esses campos no arquivo 'AndroidManifest.xml' -> android/app/src/main/AndroidManifest.xml (caminho da pasta).
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/> -- Aqui precisa inserir a chave da API do mps, para gerar, precisa acessar ao site https://developers.google.com/maps/documentation/android-api/signup, e gerar a chave da seguinte API 'Maps SDK for Android'.

   <!-- You will also only need to add this uses-library tag -->
   <uses-library android:name="org.apache.http.legacy" android:required="false"/>
</application>

=> react-native-geolocation: https://github.com/react-native-geolocation/react-native-geolocation
- npm install @react-native-community/geolocation - comando para fazer a instalação
- Quando for Android, precisa adicionar esse campo no arquivo 'AndroidManifest.xml' - <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
*/

import React from "react";
import Localizacao from "./src/Localizacao";

export default function App(){
  return <Localizacao/>
}