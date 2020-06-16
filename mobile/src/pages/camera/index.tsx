import React, { useState, useEffect } from 'react'
import { View, Text, ToastAndroid} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Camera } from 'expo-camera';
import {Feather as Icon} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'

const camera = () =>{
    const [hasPermission, setHasPermission] = useState<Boolean>(false);

    const navigation = useNavigation()

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    function hundleGravaVideo(){
        ToastAndroid.show("Gravando por 15 segundos...", ToastAndroid.LONG)
        //começa gravação
        setTimeout(VerificacaoConcluida,15000)
    }

    function VerificacaoConcluida(){
      //paraGravação
      //envia dados para api
      ToastAndroid.show("Verificação feita com sucesso.", ToastAndroid.LONG)
      navigation.navigate('Verificador',{
        verificado: true
        //dados da analize
      })
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso a camera</Text>;
    }

    return (
    <View style={{ flex: 1,justifyContent:'center' }}>
      <Camera style={{flex: 1}} type={Camera.Constants.Type.front} ref={ref =>{
          //setCameraRef(ref)
      }}> 
        <View
          style={{
            display:'flex', flex: 1, justifyContent: 'flex-end', alignContent: 'flex-start', alignItems: 'center', padding: 20
          }}>
          <TouchableOpacity
                style={{
                    borderWidth:1,
                    borderColor:'rgba(0,0,0,0.2)',
                    alignItems:'center',
                    justifyContent:'center',
                    width:80,
                    height:80,
                    backgroundColor:'#fff',
                    borderRadius:50,
                }}
                onPress={hundleGravaVideo}
            >
                <Icon name={"video"} size={30} color="#F4C400" />
            </TouchableOpacity>
        </View>
      </Camera>
    </View>
    );
}

export default camera